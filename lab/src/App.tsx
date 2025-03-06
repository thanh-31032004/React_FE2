
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductDeltail from './pages/Deltailpage';
import ProfilePage from './pages/Profile';
import Layout from './Layouts/Layout';
import AdminLayout from './Layouts/Admin-layout';
import AdminProductList from './pages/Admin-List';
import AdminProductEdit from './pages/Admin-Edit';
import AdminCreateProduct from './pages/Admin-Create';
import LoginPage from './pages/Loginpage';
import NotFoundPage from './pages/Notfound';
import RegisterPage from './pages/Register';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import CategoryList from './pages/categories/List';
import CreateCategory from './pages/categories/Create';
import EditCategory from './pages/categories/Edit';



function App() {

  return (


    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products/:id" element={<ProductDeltail />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProductList />} />
          <Route
            path="products/add"
            element={<AdminCreateProduct />}
          />
          <Route
            path="products/edit/:id"
            element={<AdminProductEdit />}
          />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<CreateCategory />} />
          <Route
            path="categories/edit/:id"
            element={<EditCategory />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>

  )
}
export default App

