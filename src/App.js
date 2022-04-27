import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ShopProvider } from './ApplicationContext';
import axiosConfig from './axiosConfig';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import FormProduct from './pages/products/FormProduct';
import Product from './pages/products/Product';
import Products from './pages/products/products';


function App() {
  return (
      <ShopProvider>
        <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin"  exact element={<Login /> } />
                <Route element={<ProtectedRoute  />}>
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/products/save" element={<FormProduct />} />
                </Route>
              </Routes>
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
