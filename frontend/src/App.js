import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PolicyPage from "./pages/PolicyPage";
import Registration from "./pages/auth/Registration";

import Dashboard from "./pages/user/Dashboard";
import PageNotFound from './componets/layout/PageNotFound';
import PrivateRoute from './componets/routes/userRoute';
import ForgetPassword from "./pages/auth/forgetPassword";  // Update to lowercase 'forgetPassword'
import Login from './pages/auth/login';
import AdminRoute from "./componets/routes/adminRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProducts from "./pages/admin/UpdateProducts";

import UpadateCategory from "./pages/admin/UpdateCategory";
import Categories from "./pages/admin/Categorys";
import ProductsByCategory from "./pages/ProductsByCategories";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/SingleProductPage";
import AdminOrders from "./pages/admin/AdminOrders";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        
        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        <Route path="/Dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-Category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:id" element={<UpdateProducts />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/Categories" element={<Categories />} />
          <Route path="admin/Category/:id" element={<UpadateCategory />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
    
        </Route>

        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/category/:categoryId" element={<ProductsByCategory />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
       
     
      </Routes>
    </>
  );
}

export default App;
