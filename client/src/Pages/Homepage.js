import React from "react";
import Layout from "../Components/Layout/Layout";
import Loading from "./AuthUSer/Loading";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Prices } from "../Components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import './Homepage.css'


const Homepage = () => {
  const [cart, setCart] = useCart();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  // const [Loading, setloading] = useState(false);
  //page
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  //Get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // get All Product
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct(data.products); // Make sure the API response structure matches
      toast.success("Getting all product");
    } catch (error) {
      setLoading(false);
      // console.error("Error in getting all product:", error);
      toast.error("Error in getting all product");
    }
  };

  //Get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...products, ...data?.products]);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Filter Category
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //Get Filtered Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      // console.log(error);
    }
  };

  const [scroll ,setScroll]=useState(false);
  const handleScroll=()=>{
    const offset=window.scrollY;
    if(offset>500){
      setScroll(true)
    }else{
      setScroll(false)
    }
  }
useEffect(()=>{
  window.addEventListener("scroll",handleScroll)
},[]) 

  return (
    <Layout title={"All Product"}>
       {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <div className="main_container">
      <div className=" mainCLS">
        <div className="section_1">
        <div className={`main-header ${scroll ? "sticky-header":" "}`} >
        <div className="col-md-3 cat-container">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column cat-container2">
            {category?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="checkbox"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* //Filter By price */}

        <div className="col-md-3 prc-container">
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column  prc-container2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio className="checkbox" value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column prc_btn">
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reset filter
            </button>
          </div>
        </div>
        </div>
        </div>
        
       {/* //Product Container */}
        <div className="res_cont ">
          <h1 className="text-center">All Products</h1>
          
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
          <div className="m-2 p-3 loading">
            {products && products.length < total && (
              <button
                className=" loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
      </div>
    </Layout>
  );
};

export default Homepage;