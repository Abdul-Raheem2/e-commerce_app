
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import Root from './features/root';
import Products from './features/products';
import Register from './features/auth/Register';
import LogIn from './features/auth/LogIn';
import Orders from './features/orders';
import Basket from './features/basket';
import Account from './features/account';

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
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
