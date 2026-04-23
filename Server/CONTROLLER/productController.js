import Product from "../MODEL/productModel.js";

// ✅ MUST be export const
export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = new Product({
      name,
      price,
      image: req.file.filename
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ MUST be export const
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};