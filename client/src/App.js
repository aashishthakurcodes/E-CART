import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Noresult from "./Pages/Noresult";
import Register from "./Pages/AuthUSer/Register";
import Login from "./Pages/AuthUSer/Login.js";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import Forgetpass from "./Pages/AuthUSer/Forgetpass";
import AdminRoutes from "./Components/Routes/AdminRoutes";
import Admindash from "./Pages/Admin/Admindash";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import User from "./Pages/Admin/User";
import Order from "./Pages/Order";
import Profile from "./Pages/Profile";
import Product from "./Pages/Admin/Product";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import SearchInput from "./Components/Form/SearchInput";
import SearchPG from "./Pages/SearchPG";
import ProductPage from "./Pages/ProductPage";
import AllCategories from "./Pages/AllCategories";
import CategoryWiseData from "./Pages/CategoryWiseData";
import Cardpage from "./Pages/Cardpage";
import AdminOrder from "./Pages/Admin/AdminOrder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPG />} />
        <Route path="/cart" element={<Cardpage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/category/:slug" element={<CategoryWiseData />} />
        <Route path="/cart/order" element={<Order/>} />
        {/* //NestedcRoutes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="create-product/order" element={<Order />} />
          <Route path="create-category/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<Admindash />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/orders" element={<AdminOrder />} />
          <Route path="users" element={<User />} />
        </Route>
        <Route path="/forgot-password" element={<Forgetpass />} />
        
        <Route path="/*" element={<Noresult />} />
      </Routes>
    </>
  );
}

export default App;
