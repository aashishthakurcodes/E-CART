import slugify from "slugify";
import CategoryModel from "../Models/CategoryModel.js";

export const createCategoryCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    //Existing Category Validation
    const existcategory = await CategoryModel.findOne({ name });
    if (existcategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exist",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category Added",
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "category Adding error",
      error,
    });
  }
};

export const updateCategoryCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated",
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "category Updating error",
      error,
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Getting all category data",
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting all category data",
      error,
    });
  }
};

export const singleCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
        success: true,
        message: "Getting Single category data",
        category,
      });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting all category data",
      error,
    });
  }
};


export const deleteCategory =async(req,res)=>{
    try {
        const {id}=req.params
       await CategoryModel.findByIdAndDelete(id) 
       res.status(200).send({
        success: true,
        message: "Category delelted Successfully",
    
      });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in deleting Data",
          error,
        });
      }
}
