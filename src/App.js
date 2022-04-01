import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import FormCategory from './pages/categories/FormCategory';
import Layout from './components/Layout';
import ListProducts from './components/ListProducts';
import Categories from './pages/categories/Categories';
import Comments from './pages/comments/comments';
import Home from './pages/Home/Home';
import FormProduct from './pages/products/FormProduct';
import Product from './pages/products/Product';
import Products from './pages/products/products';
import Users from './pages/users/users';
import { ShopProvider } from './ApplicationContext';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';


function App() {
  return (
    <Router>
        <ShopProvider>
          <Layout>
                <Routes>
                  
                  <Route path="/"  exact element={<Home />} />
                  <Route path="categories/:name" element={<Home />} />
                  
                  <Route path="/login"  exact element={<Login /> } />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:id/edit" element={<FormCategory />} />
                  <Route path="/category/save" element={<FormCategory />} />
                  {/* <Route path="categories/:name" element={<ListProducts />} key={window.location.pathname} /> */}
                  <Route path="/users" element={<Users />} />
                  <Route path="/comments" element={<Comments />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/products/save" element={<FormProduct />} />
                </Routes>
          </Layout>
        </ShopProvider>
    </Router>
  );
}

export default App;
