import Product from "../models/product";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status<Number>(200).json({
    success: newProduct ? true : false,
    createdProduct: newProduct ? newProduct : "Cannot create new product",
  });
});
const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.status(200).json({
    success: products ? true : false,
    productDatas: products ? products : "Cannot get products",
  });
});
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product",
  });
});

export default {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
