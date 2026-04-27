import Product from "../MODEL/productModel.js";

export const addProduct = async (req, res) => {
  try {
    // 🔥 DEBUG LOG
    console.log(req.body);
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image not uploaded" });
    }

    const { name, price } = req.body;

    const product = new Product({
      name,
      price,
      image: req.file.filename
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};