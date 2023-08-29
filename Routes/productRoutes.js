import express from "express";
import { isAdmin, requireSign } from "../Middlewares/authMiddlewares.js";
import {
  productCTRL,
  getProductctrl,
  getSingleCTRL,
  productPhotoCTRL,
  deletePrdctCTRL,
  updateCTRL,
  prdctFilter,
  productCountCTRL,
  productListCTRL,
  searchPrdtCTRL,
  relatedPrdctCTRL,
  productcatCTRL,
  braintreeTokenCTRL,
  braintreePymntCTRL
} from "../Controllers/productCTRL.js";
import formidable from "express-formidable"; //image upload
const router = express.Router();

//Routes
router.post("/create-product", requireSign, isAdmin, formidable(), productCTRL);

//Get All Products
router.get("/get-product", getProductctrl);

//Get single product
router.get("/get-product/:slug", getSingleCTRL);

//Get photo url
router.get("/product-photo/:pid", productPhotoCTRL);

//Delete Product
router.delete("/delete-product/:pid", deletePrdctCTRL);

//Update
router.put(
  "/update-product/:pid",
  requireSign,
  isAdmin,
  formidable(),
  updateCTRL
);

//Filter Product
router.post("/product-filter", prdctFilter);

//Product count
router.get("/product-count", productCountCTRL);

//Product per Page
router.get("/product-list/:page", productListCTRL);

//search prdct
router.get("/search/:keyword", searchPrdtCTRL);

//Similiar Product
router.get("/related-product/:pid/:cid", relatedPrdctCTRL);

//Category wise Product
router.get("/product-category/:slug", productcatCTRL);

//Payment Routes
//getting token
router.get('/braintree/token',braintreeTokenCTRL)

//getting payment
router.post('/braintree/payment',requireSign,braintreePymntCTRL)
export default router;
