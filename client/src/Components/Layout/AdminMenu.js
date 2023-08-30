import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4  className="reg_h1">Admin Panel</h4>
        <NavLink
          to="/dashboard/create-category"
          className="list-group-item list-group-item-action active"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/create-product"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          Products
        </NavLink>
        

        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          Orders
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
