import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from './features/auth/components/SignUp.jsx';
import store from './store/store.js'
import SignIn from './features/auth/components/SignIn.jsx'
import Home from './page/Home.jsx';
import Activity from './features/users/Activity.jsx';
import Protected from './routes/Protected.jsx';
import ProductForm from './features/users/components/Product.jsx';
import './index.css'
import ProductDetail from './components/ProductDetail.jsx';
import Profile from './features/users/Profile.jsx';
import CategoryPage from './page/CategoryPage.jsx';
import CartPage from './page/CartPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp/> },
      { path: "/login", element: <SignIn /> },
      // { path: "/aboutus", element: <AboutUs/> },
      // { path: "/admin-login", element: <AdminLogin />},
      // { path: "/subscription", element: <PricingPlans/>},
      { path: "/products/details/:id", element: <ProductDetail/>,},
      { path: "/productByCategory/:categoryName", element: <CategoryPage/>,},
      // { path: "/:propertyType/:type", element: <PropertyList/>},
      // { path: "/searchresult/:propertyType/:type/:city/:flatSize/:pageno/:size", element: <SearchResult/>},
      {
        path: "/home",
        element: <Protected />,
        children: [
          { path: "/home/profile", element: <Profile /> },
          { path: "/home/activity", element: <Activity /> },
          { path: "/home/activity/postProduct", element: <ProductForm/> },
          { path: "/home/cart", element: <CartPage/>}
          // { path: "/home/activity/postedproducts", element: <PostedProduct/> },
      //     { path: "/home/activity/bungalowAD", element: <BungalowForm/> },
      //     { path: "/home/subscription-payment", element: <Payment/> },
      //     // { path: "/home/:propertyType/:id", element: <Detail/>},
      //     { path: "/home/:propertyType/:type", element: <PropertyList/>},


        ],
      },
      // {
      //   path: '/admin', 
      //   element: <AdminProtected/> , 
      //   children:[
      //     {path:'/admin/dashboard', element: <Dashboard/>}
      //   ]}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
