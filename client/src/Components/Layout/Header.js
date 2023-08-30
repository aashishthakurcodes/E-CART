import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../Hooks/useCategory";
import { Avatar, Badge } from "antd";
import { useCart } from "../../Context/Cart";
import './Header.css'
import { useState ,useEffect} from "react";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
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
    <>
    <div className={`main-header ${scroll ? "sticky-header":" "}`}>
      <nav className="navbar navbar-expand-lg  bg-dark .bg-gradient">
        <div className="container-fluid">
          <button
            className="navbar-toggler  bg-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink to={"/"} className="navbar-brand text-white" href="#">
              E-CART <FiShoppingCart />
            </NavLink>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-white"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item " to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-white">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-white">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none",color:"white" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item cart">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link text-xl carticon text-white">
                    <FiShoppingCart/>
                  </NavLink>
                </Badge>
              </li>
            </ul>
            <SearchInput />
          </div>
        </div>
      </nav>
      </div>
    </>
  );
};

export default Header;
