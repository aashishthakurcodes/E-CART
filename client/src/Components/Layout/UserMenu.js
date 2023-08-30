import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>Dashboard</h4>
        <NavLink
          to="/dashboard/create-category/profile"
          className="list-group-item list-group-item-action active"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/create-product/order"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          Orders
        </NavLink>
        
      </div>
    </>
  );
};

export default UserMenu;
