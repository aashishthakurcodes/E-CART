import slugify from "slugify";
import productModel from "../Models/productModel.js";
import CategoryModel from "../Models/CategoryModel.js";
import orderModel from "../Models/orderModel.js";
import dotenv from 'dotenv'
import fs from "fs";
//Payment
import braintree from "braintree";


dotenv.config();


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAIN_TREE_MERCHANTID,
  publicKey: process.env.BRAIN_TREE_PUBLICKY,
  privateKey: process.env.BRAIN_TREE_PRIVATEKY,
});

//POST METHOD
export const productCTRL = async (req, res) => {
  try {
    const { name, price, slug, description, quantity, category, shipping } =
      req.fields;

    const { photo } = req.files;
    //Valiadation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "NameRequired",
        });

      case !description:
        return res.status(500).send({
          error: "description is required",
        });

      case !price:
        return res.status(500).send({
          error: "price is required",
        });

      case !quantity:
        return res.status(500).send({
          error: "quantity is also required",
        });

      case !category:
        return res.status(500).send({
          error: "category is also required",
        });

      case photo && photo.size > 100000:
        return res.status(500).send({
          error: "Photo is also required and should be less than 1 mb",
        });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

//Get all
export const getProductctrl = async (req, res) => {
  try {
    //getting only 12 products and make anither  api for photos and show only 12 products at a time
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      total: product.length,
      success: true,
      message: "Getting All product",
      product,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all product",
      error,
    });
  }
};

export const getSingleCTRL = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      total: product.length,
      success: true,
      message: "Successfully getting single product",
      product,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting a single product",
      error,
    });
  }
};

export const productPhotoCTRL = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting a Product Image",
      error,
    });
  }
};

export const deletePrdctCTRL = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(201).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Delete",
      error,
    });
  }
};

export const updateCTRL = async (req, res) => {
  try {
    const { name, price, slug, description, quantity, category, shipping } =
      req.fields;

    const { photo } = req.files;

    //Valiadation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "NameRequired",
        });

      case !description:
        return res.status(500).send({
          error: "description is required",
        });

      case !price:
        return res.status(500).send({
          error: "price is required",
        });

      case !quantity:
        return res.status(500).send({
          error: "quantity is also required",
        });

      case !category:
        return res.status(500).send({
          error: "category is also required",
        });

      case photo && photo.size > 100000:
        return res.status(500).send({
          error: "Photo is also required and should be less than 1 mb",
        });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Update",
      error,
    });
  }
};

// Filter Product
export const prdctFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Filter",
      error,
    });
  }
};

// Product count controller(
export const productCountCTRL = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};
//product list based on page
export const productListCTRL = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const skip = (page - 1) * perPage;

    const products = await productModel
      .find({})
      .select("-photo")
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      message: "Error in product list page",
      error,
      success: false,
    });
  }
};

//search Product
export const searchPrdtCTRL = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      message: "Error in product list page",
      error,
      success: false,
    });
  }
};

//Similiar Products
export const relatedPrdctCTRL = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({ success: true, products });
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      message: "Error in Similiar Product",
      error,
      success: false,
    });
  }
};

//Get product by Category
export const productcatCTRL = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in  Category Wise Data",
      error,
    });
  }
};
//Payment Gateway API
export const braintreeTokenCTRL = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    // console.log(error);
  }
};

export const braintreePymntCTRL = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    // console.log(error);
  }
};
