import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import userModel from "../Models/userModel.js";
import orderModel from '../Models/orderModel.js'
import JWT from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, answer, address } = req.body;
    //Validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "E-mail is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    // Existing User
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        success: false,
        message: "User Already registered",
      });
    }

    //Hashing Password use
    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      answer,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credientials",
      });
    }
    ///Check user email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "E-mail is not registered",
      });
    }
    //Check Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // token //Local storage
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const testRoutes = async (req, res) => {
  try {
    res.send({
      success: true,
      message: "Successfull midleware working",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "middleware error",
    });

    // console.log(error);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    //Validation
    if (!email) {
      res.status(400).send({
        message: "E-mail is required",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "Answer is required .",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New Password is required",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Something went wrong",
      });
    }
    const hashed = await hashPassword(newPassword); //new Password hashed
    // await userModel.findById(user._id,{password:hashed})
    user.password = hashed; // Update the user's password
    await user.save(); //Data updated
    res.status(200).send({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    // console.log("The error in forget password is", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const updateProfileCTRL = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //pasword
    if (password && password.length < 5) {
      return res.json({
        error: "Password is required it must have 6 character",
      });
    }
    const hashedPassword =password? await hashPassword(password) :undefined
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success:true,
      message:"Profile Updated Successfully",
      updateUser,
    })
  } catch (error) {
    // console.log("The error in forget password is", error);
    res.status(400).send({
      success: false,
      message: " Error while updating profile",
      error,
    });
  }
};

//User Orders
export const getOrderCTRL=async(req,res)=>{
  try {
    const orders =await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
    res.json(orders)
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while getting orders",
      error,
    });
  }
}

//Get All orders
export const getAllOrderCTRL=async(req,res)=>{
  try {
    const orders =await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:"-1"})
    res.json(orders)
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while getting All orders",
      error,
    });
  }
}

//Order Status
export const orderStatusCTRL=async(req,res)=>{
  try {
    const {orderID}=req.params
    const {status}=req.body
    const orders=await orderModel.findByIdAndUpdate(orderID,{status},{new:true})
    res.json(orders)
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while Updating orders",
      error,
    });
  }
}