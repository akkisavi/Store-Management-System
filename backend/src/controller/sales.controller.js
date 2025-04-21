import db from "../DB/db.js";
import { generateBill } from "./bill.controller.js";

export const addSale = async (req, res) => {
    try {
      const { product_id, quantity_sold } = req.body;
      const userId = req.user.id;
  
      // Fetch product
      const [productResult] = await db.execute('SELECT * FROM products WHERE id = ?', [product_id]);
      if (productResult.length === 0) return res.status(404).json({ message: "Product not found" });
  
      const product = productResult[0];
      if (product.product_quantity < quantity_sold) {
        return res.status(400).json({ message: "Not enough stock" });
      }
  
      const total_price = product.price_per_unit * quantity_sold;
  
      // Update product stock
      await db.execute(
        'UPDATE products SET product_quantity = product_quantity - ? WHERE id = ?',
        [quantity_sold, product_id]
      );
  
      // Insert into sales table
      await db.execute(
        `INSERT INTO sales (product_id, quantity_sold, total_price, sold_by) VALUES (?, ?, ?, ?)`,
        [product_id, quantity_sold, total_price, userId]
      );
  
      // Generate invoice dynamically
      const invoiceBuffer = await generateBill({
        customerName: req.user.name,
        products: [
          {
            name: product.product_name,
            quantity: quantity_sold,
            unitPrice: product.price_per_unit
          }
        ]
      });
  
      // Send PDF invoice to frontend
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=invoice-${Date.now()}.pdf`);
      res.send(Buffer.from(invoiceBuffer, "base64"));
  
    } catch (error) {
      console.error("❌ Error adding sale:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  

// Admin-only: View daily profits and product sales
export const getDailySalesReport = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        DATE(sold_at) as date,
        SUM(total_price) as total_profit,
        COUNT(*) as total_sales
      FROM sales
      GROUP BY DATE(sold_at)
      ORDER BY DATE(sold_at) DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error fetching daily sales report:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
