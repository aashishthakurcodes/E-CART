import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const User = () => {
  return (
    <Layout title={"Dashboard - Users"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
          <div>
            <h1>Create User</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
