import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;


const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const naviagate =useNavigate();

  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Craeting handleCreate function
  const handleCreate = async(e)=>{
  e.preventDefault();
  try {
    const productData=new FormData()
    productData.append('name',name)
    productData.append('description',description)
    productData.append('quantity',quantity)
    productData.append('price',price)
    productData.append('photo',photo)
    productData.append('category',category)
     const {data}=await axios.post('/api/v1/product/create-product', productData )
     if(data?.success){
      toast.success("Product Created Successfully")
      naviagate('/dashboard/admin/products')
     }
     else{
      toast.error(data?.message)
     }
  } catch (error) {
    // console.log(error);
    toast.error("Something went wrong")
  }
  }
  return (
    <Layout title={"Dashboard - Craete Product"}>
      <div className="create_main">
        <div className="boom">
          <AdminMenu />
          </div>
          <div className="create_sec1">
            <h1 style={{ textAlign: "center" }} className="reg_h1">Create product</h1>
            <div className="product_select">
              <Select
                placeholder="Select your category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              </div>
              {/* // for Images */}
              <div className="product_btn">
                <label className="button-50">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                  {/* image/* mean support all type of images */}
                </label>
              </div>
              {/* //Preview */}
              <div>
                {photo && (
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              
              <div className="product_input">
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                value={description}
                placeholder="Write a description"
                className="form-control"
                onChange={(e) => setdescription(e.target.value)}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Select Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Enter the price"
                className="form-control"
                onChange={(e) => setprice(e.target.value)}
              />
              <Select
             placeholder="Select for shipping"
             size="large"
             showSearch onChange={(value)=>setShipping(value)} >
                <Option>Yes</Option>
                <Option>No</Option>
              </Select>
              </div>

              <div className="create_product_btn">
                <button className="button-51" onClick={handleCreate}>Create Product</button>
              </div>
            
          </div>
        
      </div>
    </Layout>
  );
};

export default CreateProduct;
