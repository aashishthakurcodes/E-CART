import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/auth";
import { Select } from "antd";
import '../../CSS/AdminOrder.css'
import moment from "moment";
const {Option}=Select
const AdminOrder = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setCahngeStatus] = useState("");
  const [orders, setOrder] = useState([]);
  const [auth, setauth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrder(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

 const handleChange=async (orderID,value)=>{
    try {
       const {data}=await axios.put(`/api/v1/auth/order-status/${orderID}`,{status:value}) 
       getOrders();
    } catch (error) {
        // console.log(error);
    }
 } 
  return (
    <Layout title="All Orders">
      <div className="">
        <div className="">
          <AdminMenu />
        </div>
        <div className="order_main">
          <h1 className="reg_h1">All Orders</h1>
          <div className="order_card">
            {orders?.map((o, i) => {
              return (
                <div className="order_data">
                  <div  className="table-responsive order">
                  <table className="table ">
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
                        <td>
                            <Select bordered={false} onChange={(value)=> handleChange(o._id,value)} defaultValue={o?.status}>
                                {status.map((s,i)=>(
                                    <Option key={i} value={s}>{s}</Option>
                                ))}
                                

                            </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                  <div className="">
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
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
