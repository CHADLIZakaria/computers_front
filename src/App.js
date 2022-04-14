import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import FormProduct from './pages/products/FormProduct';
import Product from './pages/products/Product';
import Products from './pages/products/products';
import Home from './pages/Home/Home';
import {ShopContext, ShopProvider} from './ApplicationContext'
import Layout from './components/Layout'
import { useContext, useEffect } from "react";
import AuthenticationService from "./service/AuthenticationService";


function App() {
  
  

  return (
      <ShopProvider>
        <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin"  exact element={<Login /> } />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/products/save" element={<FormProduct />} />
              </Routes>
          </Router>
        
      </ShopProvider>
  );
}

const ProtectedRoute = ({
  
  children,
}) => {
  if(localStorage.getItem('user') != null) {
    return <Navigate to='/admin' />
  }
  else {
    return children;
  }


} 


export default App;
