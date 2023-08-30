import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../AuthUSer/Loading";


const Products = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/v1/product/get-product");
      // console.log(data);
      setProducts(data.product);
      setLoading(false)
     
    } catch (error) {
      // console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method - fetch products on initial mount
  useEffect(() => {
    getAllProducts();
  }, []); // Empty dependency array to fetch products once on initial mount
  // console.log(product);
  return (
    <Layout>
        {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <div className="all_product">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap product_list">
          {Array.isArray(product) && product.length > 0 ? (
              product?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/products/${p.slug}`}
                  className="product-link"
                >
                  <div className="product_card m-2" >
                    <div className="product_img">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      // className="card-img-top"
                      alt={p.name}
                    />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{p.name}</h3>
                      <p className="card-text"> {p.description.substring(0, 60)}...
                  </p>
                     
                      <hr/>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
