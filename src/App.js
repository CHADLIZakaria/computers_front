import { IconButton } from "@chakra-ui/react";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ShopProvider } from './ApplicationContext';
import axiosConfig from './axiosConfig';
import Navbar from './components/Navbar/Navbar';
import AdminFormProduct from "./pages/admin/products/AdminFormProduct";
import AdminProducts from "./pages/admin/products/AdminProducts";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Product from './pages/products/Product';
import {BsHandIndexThumb} from 'react-icons/bs'
import { useEffect, useState } from "react";


function App() {
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
  } 

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    });
  }, [])
  

  return (
      <ShopProvider>
        <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/admin"  exact element={<Login /> } />
                <Route element={<ProtectedRoute  />}>
                  <Route path="/products" element={<AdminProducts />} />
                  <Route path="/product/edit/:id" element={<AdminFormProduct />} />
                  <Route path="/products/save" element={<AdminFormProduct />} />
                </Route>
              </Routes>
              
              {showScrollToTop && 
                <IconButton
                  variant='outline'
                  colorScheme='blue'
                  position='fixed'
                  right='0'
                  bottom='10px'
                  w='32px'
                  h='32px'
                  zIndex='999'
                  color='blue'
                  border='none'
                  onClick={() => scrollToTop()}
                  icon={<BsHandIndexThumb />}
                />
              }
              
          </Router>
      </ShopProvider>
  );
}

const ProtectedRoute = ({
  children
}) => {
  let access_token = localStorage.getItem('user')
  if(access_token) {
    let jwtData = access_token.split('.')[1]
    let decodeJwtJsonData = window.atob(jwtData)
    if(JSON.parse(decodeJwtJsonData).roles.includes('ROLE_ADMIN')) {
      axiosConfig.defaults.headers.common['Authorization'] = 'Bearer '+access_token;
      
      return  children ? children : <Outlet />;
    }
  }
  return <Navigate to="/" replace />

} 


export default App;
