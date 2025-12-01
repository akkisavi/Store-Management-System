import db from "../DB/db.js";

export const addProduct = async (req, res) => {
  try {
    const { product_name, product_quantity, price_per_unit, location } =
      req.body;

    // Check if product already exists
    const [existingProduct] = await db.execute(
      "SELECT * FROM products WHERE product_name = ?",
      [product_name]
    );

    if (existingProduct.length > 0) {
      // Update quantity if product already exists
      const updatedQuantity =
        existingProduct[0].product_quantity + parseInt(product_quantity);

      const updateQuery = `
      UPDATE products 
      SET product_quantity = ?, price_per_unit = ?, location = ?
      WHERE product_name = ?
    `;
      await db.execute(updateQuery, [
        updatedQuantity,
        price_per_unit,
        location,
        product_name,
      ]);

      res.status(200).json({
        message: "Product quantity updated successfully",
      });
    } else {
      // Insert new product if it doesn't exist
      const insertQuery = `
      INSERT INTO products (product_name, product_quantity, price_per_unit, location)
      VALUES (?, ?, ?, ?)
    `;
      const [result] = await db.execute(insertQuery, [
        product_name,
        product_quantity,
        price_per_unit,
        location,
      ]);

      res.status(201).json({
        message: "Product added successfully",
        productId: result.insertId,
      });
    }
  } catch (error) {
    console.error("Error adding or updating product:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
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
    console.error("Error fetching product:", error);
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

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { product_quantity } = req.body;

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     product.product_quantity = product_quantity;
//     await product.save();

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product" });
//     console.log(error);
//   }
// };

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

    res.status(200).json({ message: "Product sold successfully" });
  } catch (error) {
    console.error("Error selling product:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
