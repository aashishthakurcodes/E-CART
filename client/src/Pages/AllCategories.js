import React from "react";
import Layout from "../Components/Layout/Layout";
import { useState, useEffect } from "react";
import useCategory from "../Hooks/useCategory";
import { Link } from "react-router-dom";
import "../CSS/Allcategories.css";
import Loading from "./AuthUSer/Loading";


const AllCategories = () => {
  const categories = useCategory();
  const [loading, setLoading] = useState(false);
  return (
    <Layout title={"All Categories"}>
      {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <div className="cat_cont">
        <h1>All Categories</h1>
       
        <div className="cat_section">
          {categories.map((c) => (
            <div className="cat_main" key={c._id}>
              <Link to={`/category/${c.slug}`} className="link">
                <div className="cat_box">{c.name}</div>
              </Link>
            </div>

            
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllCategories;
