import express from "express";
import {
    registerUser,
    loginUser,
    testRoutes,forgetPassword, updateProfileCTRL,getOrderCTRL,getAllOrderCTRL,orderStatusCTRL
  
} from "../Controllers/authController.js";
import { isAdmin, requireSign } from "../Middlewares/authMiddlewares.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerUser);

//LOGIN || POST
router.post("/login", loginUser);

//ForgetPassword
router.post('/forget-password',forgetPassword)



//test routes
router.get("/test", requireSign, isAdmin, testRoutes);

//protected User route auth
router.get("/user-auth", requireSign, (req, res) => {
  res.status(200).send({ ok: true });
});

//Admin Routes
router.get("/admin-auth", requireSign,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put('/profile',requireSign,updateProfileCTRL)

//User order
router.get('/orders',requireSign,getOrderCTRL)

//User All order
router.get('/all-orders',requireSign,isAdmin, getAllOrderCTRL)

//status Update Api
router.put('/order-status/:orderId',requireSign,isAdmin,orderStatusCTRL)


export default router;