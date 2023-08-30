import React from "react";
import Layout from "../Components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,navigate, useNavigate } from "react-router-dom";
import '../CSS/Category.css'
import Loading from "./AuthUSer/Loading";
const CategoryWiseData = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  useEffect(()=>{
   if(params?.slug) getProductbyCat()
      },[params?.slug])

  const getProductbyCat = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      // console.log(data);
      setProducts(data?.products);

      // console.log(products);
      
      setCategory(data?.category);
      setLoading(false)
      // console.log(category);
    } catch (error) {
      // console.log(error);
    }
  };
 
  return (
    <Layout>
      <div className="category_container">
      {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <div className="container" >
        <h1 className="reg_h1">Category {category?.name}</h1>
        <h5>{products?.length} results found</h5>
      
      <div className="row">
      <div className=" home-page">
          <div className="d-flex flex-wrap product_cont">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
         
        </div>

      </div>
      </div>
      </div>
    </Layout>
  );
};

export default CategoryWiseData;
