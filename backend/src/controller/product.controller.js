import db from "../DB/db.js";

export const addProduct = async (req, res) => {
    try {
      const { product_name, product_quantity, price_per_unit, location } =
        req.body;
  
      const query = `
          INSERT INTO products (product_name, product_quantity, price_per_unit, location)
          VALUES (?, ?, ?, ?)
        `;
  
      const [result] = await db.execute(query, [
        product_name,
        product_quantity,
        price_per_unit,
        location,
      ]);
  
      res.status(201).json({
        message: "✅ Product added successfully",
        productId: result.insertId,
      });
    } catch (error) {
      console.error("❌ Error adding product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const getAllProducts = async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT * FROM products");
      res.status(200).json(rows);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const getProductByName = async (req, res) => {
    try {
      const { name } = req.params;
      const [rows] = await db.execute(
        "SELECT * FROM products WHERE product_name = ?",
        [name]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const deleteProductbyName = async (req, res) => {
    try {
      const { name } = req.params;
      const [result] = await db.execute(
        "DELETE FROM products WHERE product_name = ?",
        [name]
      );  
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }    
  
      res.status(200).json({ message: "✅ Product deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

export const updateProduct = async (req, res) => {
    try {
      const { name } = req.params;
      const { product_quantity, price_per_unit, location } = req.body;
  
      const [result] = await db.execute(
        "UPDATE products SET product_quantity = ?, price_per_unit = ?, location = ? WHERE product_name = ?",
        [product_quantity, price_per_unit, location, name]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "✅ Product updated successfully" });
    } catch (error) {
      console.error("❌ Error updating product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

export const sellProduct = async (req, res) => {
    try {
      const { name } = req.body;
  
      const [result] = await db.execute(
        "UPDATE products SET product_quantity = product_quantity - 1 WHERE product_name = ?",
        [name]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "✅ Product sold successfully" });
    } catch (error) {
      console.error("❌ Error selling product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  