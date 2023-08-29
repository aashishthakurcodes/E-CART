import express from "express";
const router=express.Router();
import { isAdmin, requireSign } from "../Middlewares/authMiddlewares.js";
import { createCategoryCtrl,updateCategoryCtrl,categoryController,singleCategory ,deleteCategory} from "../Controllers/categoryController.js";

//Routes
//create_category
router.post('/create-category',requireSign ,isAdmin,createCategoryCtrl )

//Update-category
router.put('/update-category/:id',requireSign ,isAdmin,updateCategoryCtrl )

//All category
router.get('/get-categories',categoryController)

//Single Category data
router.get('/single_category/:slug',singleCategory)

//Delete cateegory
router.delete('/delete-category/:id',requireSign,isAdmin,deleteCategory)

export default router