import express from "express";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productFiltersController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter products
router.post('/product-filters', productFiltersController);

//search products
router.get('/search/:keyword', searchProductController);

//similar Product
//router.get('/related-product/:pid/:cid', relatedProductController);

// get products from a category
router.get('/product-category/:slug',productCategoryController);

//payment routes
//token
router.get('/braintree/token', braintreeTokenController);

//payments
router.get('/braintree/payment', requireSignIn, braintreePaymentController);


export default router;
