import './app.css';
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Root from '../features/root/root';
import Products from '../features/products/products';
import Register from '../features/auth/Register';
import LogIn from '../features/auth/LogIn';
import Orders from '../features/orders/orders';
import Basket from '../features/basket/basket';
import Account from '../features/account';

import { accountLogOut } from '../features/account/accountSlice';
import { basketLogOut } from '../features/basket/basketSlice';


const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Products/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/logIn" element={<LogIn/>}/>
    <Route path="/basket" element={<Basket/>}/>
    <Route path="/orders" element={<Orders/>}/>
    <Route path="/account" element={<Account/>}/>
  </Route>
));


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
        let [resource, config] = args;
        const response = await originalFetch(resource, config);
        if(response.status===401){
          dispatch(accountLogOut());
          dispatch(basketLogOut());
        }
        return response;
    };
  },[dispatch])
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
