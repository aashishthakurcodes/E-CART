import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast from 'react-hot-toast'
import {useNavigate}  from 'react-router-dom'
import axios from "axios";
import '../../CSS/Register.css'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [answer, setanswer] = useState("");
  const [address, setaddress] = useState("");

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone ,answer,address}
      );
      if (res && res.data.success) {
        toast.success(res.data.message, {
          duration: 5000, 
        });
        navigate('/login');
      }
      else {
        toast.error(res.data.message, {
          duration: 2000
        });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register User"}>
      <div className="register_main">
      <h1 className="reg_h1">Registeration Form</h1>
      <div className="register">
       
        <form onSubmit={handleSubmit}>
        <div className="form_data">
          <div className=" mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              aria-describedby="NameHelp"
              placeholder="Name"
              required
            />
          </div>

          <div className="mb-3">
           
            <input
              type="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setemail(e.target.value)}
              placeholder="E-mail"
            />
          </div>

          <div className="mb-3">
            
            <input
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setpassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            
            <input
              type="text"
              value={phone}
              className="form-control"
              id="exampleInputNumber"
              aria-describedby="NumberHelp"
              onChange={(e) => setphone(e.target.value)}
              required
              placeholder="Phone Number"
            />
          </div>


          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
             What is your Nickname
            </label>
            <input
              type="text"
              value={answer}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setanswer(e.target.value)}
              placeholder="Remember it in case of forget password"
            />
          </div>

          
           
            <input
              type="text"
              value={address}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Address"
            />
          
          <div className="reg_btn">
          <button type="submit" className="button-51">
            Submit
          </button>
          </div>
          </div>
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default Register;
