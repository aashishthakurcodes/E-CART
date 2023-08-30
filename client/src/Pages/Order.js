import React from "react";
import Layout from "../Components/Layout/Layout";
import UserMenu from "../Components/Layout/UserMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth";
import moment from "moment";
import '../CSS/Order.css'

const Order = () => {
  const [orders, setOrder] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrder(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="Order_conatiner">
        <div className="oiu">
          <div className="">
            <UserMenu />
          </div>
          <div className="order_main">
            <h1 className="reg_h1">All orders</h1>
            {orders?.map((o, i) => (
              <div className=" order_data" key={o._id}>
                <div className="table-responsive order"> {/* Add responsive class */}
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="order_card">
                  {o?.products?.map((p) => (
                    <div className="ordercard" key={p._id}>
                      <div className="img_order">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="order_prc">
                          <p>Name :- {p.name}</p>
                          <p>Description :-{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
