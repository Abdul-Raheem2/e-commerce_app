import './app.css'
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';

import Root from '../features/root/root';
import ProductList from '../features/products/productList';
import Register from '../features/auth/Register';
import LogIn from '../features/auth/LogIn';
import Orders from '../features/orders/orders';
import Basket from '../features/basket/basket';
import Account from '../features/account';
import Product from '../features/products/Product';
import Checkout from '../features/checkout';
import PaymentReturn from '../features/checkout/PaymentReturn';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route path="products" element={<ProductList/>}/>
    <Route path="products/:productId" element={<Product/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="logIn" element={<LogIn/>}/>
    <Route path="basket" element={<Basket/>}/>
    <Route path="checkout" element={<Checkout/>}/>
    <Route path="checkout/payment-return" element={<PaymentReturn/>}/>
    <Route path="orders" element={<Orders/>}/>
    <Route path="account" element={<Account/>}/>
  </Route>
));


function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
