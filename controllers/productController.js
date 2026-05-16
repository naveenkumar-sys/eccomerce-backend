import User from "../models/userModel.js";
import Product from "../models/productModel.js";

//create product
export const createProduct = async (req, res) => {
  try {
    const { title, description, images, price, category, stock } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      category,
      images,
      stock,
      seller: req.user._id, //here we are getting the user id from the request object by if we want to create product we use authentication and authorization middleware in the we attaching the user by find the user with decoded id and attaching it to the request object and so it should assign the seller to user id and they user is owner of that product
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to create product", error: error.message });
  }
};

// get All products

export const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find();
    res
      .status(200)
      .json({ message: "Get All products successfully", Products });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all the products",
      error: error.message,
    });
  }
};

//get product by Id
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({ message: "unable to find the product" });
    }
    res
      .status(200)
      .json({ message: "product fetched successfully", findProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "unable to get products", error: error.message });
  }
};

//update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images, price, category, stock } = req.body;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({ message: "unable to find the product" });
    }

    //check ownership - here also auth and admin middleware will take place we send the token by header and so it surpass the auth and admin middle then the particular user is attached to user
    //and so we can get the user id from the request object and check if the user id is same as the user id of the product
    if (findProduct.seller.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        message:
          "Access denied only owner of this product will update this products",
      });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        images,
        price,
        category,
        stock,
      },
      { new: true },
    );
    res
      .status(200)
      .json({ message: "products update successfully", updateProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "unable to update product", error: error.message });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({ message: "Can not find the product" });
    }
    if (findProduct.seller.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        message:
          "Access denied only owner of this product will update this products",
      });
    }
    const deleteProduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "products delete successfully", deleteProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "unable to delete product", error: error.message });
  }
};
