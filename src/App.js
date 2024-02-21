import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import UserContextProvider from './Components/Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider, { cartContext } from './Components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider, { WishlistContext } from './Components/Context/WishlistContext';
import Wishlist from './Components/Wishlist/Wishlist';
import Address from './Components/Address/Address';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Verify from './Components/Verify/Verify';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import NotFound from './Components/NotFound/NotFound';

let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path:'products' , element: <ProtectedRoute><Products/></ProtectedRoute> },
    {path:'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute> },
    {path:'wishlist' , element: <ProtectedRoute><Wishlist/></ProtectedRoute> },
    {path:'categories' , element: <ProtectedRoute><Categories/></ProtectedRoute> },
    {path:'brands' , element: <ProtectedRoute><Brands/></ProtectedRoute> },
    {path:'address' , element: <ProtectedRoute><Address/></ProtectedRoute> },
    {path:'allorders' , element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
    {path:'productdetails/:id' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
    {path:'login' , element: <Login/>},
    {path:'forgetPassword' , element: <ForgetPassword/>},
    {path:'verify' , element: <Verify/>},
    {path:'resetpassword' , element: <ResetPassword/>},
    {path:'register' , element: <Register/>},
    {path:'*' , element: <NotFound/>}
  ] }
])

let queryClient = new QueryClient();

function App() {

  return <WishListContextProvider>

       <CartContextProvider>
           <QueryClientProvider client={queryClient}>
         <UserContextProvider>
         <RouterProvider router={routes}></RouterProvider>
          <Toaster/>
       </UserContextProvider>
       </QueryClientProvider>
       </CartContextProvider>

  </WishListContextProvider>
   
  

   
}

export default App;
