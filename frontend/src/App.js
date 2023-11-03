
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import Root from './features/root';
import Products from './features/products';
import Register from './features/auth/Register';
import LogIn from './features/auth/LogIn';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Products/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/logIn" element={<LogIn/>}/>
  </Route>
));


function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
