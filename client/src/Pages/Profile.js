import React from "react";
import Layout from "../Components/Layout/Layout";
import UserMenu from "../Components/Layout/UserMenu";
import { useAuth } from "../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import  {useState,useEffect} from 'react'
import '../CSS/Updateuser.css'
const Profile = () => {
  //Context
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");

//Initial values
useEffect(()=>{
  const {email,name,phone,address}=auth?.user
  setName(name)
  setaddress(address)
  setemail(email)
  setphone(phone)
},[auth?.user])



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone,  address }
      );
  
       if(data?.error){
        toast.error(data?.error)
       } 
       else{
        setAuth({...auth,  user:data?.updateUser})
        let ls =localStorage.getItem('auth')
        ls=JSON.parse(ls)
        ls.user=data.updateUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success("Profile Updated")

       }
    
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="reg_h1"> Update your Profile</h1>
            <div>
            <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              aria-describedby="NameHelp"
      
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setemail(e.target.value)}
              disabled
              style={{cursor:"not-allowed"}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setpassword(e.target.value)}
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              className="form-control"
              id="exampleInputNumber"
              aria-describedby="NumberHelp"
              onChange={(e) => setphone(e.target.value)}
              
            />
          </div>

            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              
              onChange={(e) => setaddress(e.target.value)}
            />
          <div style={{width:"100%", padding:"10px", display:"flex",justifyContent:"center",alignItems:"center"} }>
          <button type="submit" className="button-50">
            Submit
          </button>
          </div>
        </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
