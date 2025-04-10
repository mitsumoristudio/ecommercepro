
import './App.css';
// import {Container} from "react-bootstrap";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/bootstrap.custom.css'
import Footer from "./components/Footer";
import './index.css'
import HomeScreen from "./screens/HomeScreen";
// import {Outlet} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import {AdminRoute} from "./components/AdminRoute";
import OrderListScreen from "./screens/adminscreens/OrderListScreen";
import ProductListScreen from "./screens/adminscreens/ProductListScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductEditScreen from "./screens/adminscreens/ProductEditScreen";
import ProfileScreen from "./screens/adminscreens/ProfileScreen";
import UserListScreen from "./screens/adminscreens/UserListScreen";
import UserEditScreen from "./screens/adminscreens/UserEditScreen";

export default function App() {
  return (
      <>
          <Router>
              <ToastContainer />
      <Header />
              <Routes >
                  <Route path="/" index={true} element={<HomeScreen />} />
                  <Route path={"/search/:keyword"} element={<HomeScreen />} />
                  <Route path={"/page/:pageNumber"} element={<HomeScreen />} />
                  <Route path={"/search/keyword/page/:pageNumber"} element={<HomeScreen/>} />
                  <Route path={"/register"} element={<RegisterScreen />} />
                  <Route path={"/login"} element={<LoginScreen />} ></Route>
                  <Route path={"/product/:id"} element={<ProductScreen />} />
                  <Route path={"/cart"} element={<CartScreen />} />

                  <Route path={""} element={<PrivateRoute />}>
                      <Route path={"/shipping"} element={<ShippingScreen />} />
                      <Route path={"/payment"} element={<PaymentScreen />} />
                      <Route path={"/placeorder"} element={<PlaceOrderScreen />} />
                      <Route path={"/order/:id"} element={<OrderScreen />} />
                      <Route path={"/admin/profile"} element={<ProfileScreen />} />
                  </Route>

                 <Route path={""} element={<AdminRoute/>}>
                     <Route path={"/admin/orderlist"} element={<OrderListScreen/>} />
                     <Route path={"/admin/productlist"} element={<ProductListScreen />} />
                     <Route path={"admin/product/:id/edit"} element={<ProductEditScreen />} />
                     <Route path={"/admin/userlist"} element={<UserListScreen />} />
                     <Route path={"/admin/user/:id/edit"} element={<UserEditScreen />} />

                 </Route>

               </Routes>

          <Footer />
      </Router>
      </>
  );
}

