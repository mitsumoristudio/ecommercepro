
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

export default function App() {
  return (
      <>
          <Router>
      <Header />
              <Routes >
                  <Route path="/" element={<HomeScreen />} />
                  <Route path={"/product/:id"} element={<ProductScreen />} />
                  <Route path={"/cart"} element={<CartScreen />} />
              </Routes>

          <Footer />
      </Router>
      </>
  );
}

