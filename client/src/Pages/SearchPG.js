import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../Context/Search";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchPG = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search Result"}>
      <div>
        <div>
            <h1>Search Result</h1>
            <h5>{values?.results.length <1?"No result Found": `Found ${values?.results.length}`}</h5>
            <div className=" home-page">
          <div className="d-flex flex-wrap product_cont">
            {values?.results?.map((p) => (
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

export default SearchPG;
