import React, { useState } from "react";
import Layout from '../../Components/Layout/Layout'
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../Context/auth";
import '../../CSS/dashboard.css'


const Admindash = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="dashboard">
        
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
           <div className="card">
          <h3>Admin :- {auth?.user?.name}</h3>
          <h3>E-mail :- {auth?.user?.email}</h3>
          <h3>Phone :- {auth?.user?.phone}</h3>
           </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Admindash;
