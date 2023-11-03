
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import Root from './features/root';
import Products from './features/products';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Products/>}/>
  </Route>
)); //products, basket


function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
