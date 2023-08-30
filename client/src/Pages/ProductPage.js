import React, { useState, useEffect } from "react";
import Layout from "./../Components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import Loading from "./AuthUSer/Loading";


import './Homepage.css'
import './ProductPg.css'
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);



  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false)
    } catch (error) {
      // console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      setLoading(false)
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <Layout>
       {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <div className="pg">
        <div className=" imgProduct">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top productImg"
            alt={product.name}
            height="300"
            width={"100px"}
          />
        </div>
        <div className=" productText">
          <h1 className="text-center reg_h1">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
         
        </div>
      </div>
      <hr />
      <div className="row product_container">
      {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
        <h4 style={{textAlign:"center"}} className="reg_h1">Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="product_page">
        <div className=" home-page">
          <div className="d-flex flex-wrap product_cont">
            {relatedProducts?.map((p) => (
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
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
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
    </Layout>
  );
};

export default ProductDetails;