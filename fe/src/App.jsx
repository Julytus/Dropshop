import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import LoginRegister from "./pages/loginregister";
import ProductManagement from "./pages/productmanage";
import CategoryManagement from "./pages/categorymanage";
import OrderManagement from "./pages/ordermanage";
import UserManagement from "./pages/usermanage";
import MyAccount from "./pages/myaccount";
import ProductDetail from "./pages/productdetail";
import Error404 from "./components/error404";
import Loading from "./components/loading";
import AuthProvider from "./components/AuthProvider";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Checkout from './pages/checkout';
import OrderSuccess from './pages/ordersuccess';
import OrderDetail from './pages/orderdetail';
import './styles/ordersuccess.css';
import ColorManagement from './pages/colormanage';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);

  const Layout = () => {
    return (
      <div className="layout-app">
        <main className="">
          <Header />
          <Outlet />
          <Footer />
        </main>
      </div> 
    )
  }

  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {index: true, element: <LoginRegister />},
      ],
    },
    {
      path: "/",
      errorElement: <Error404 />,
      children: [
        {index: true, element: <Home />},
      ]
    },
    {
      path: "/checkout",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {index: true, element: <Checkout />},
      ]
    },
    {
      path: "/order-success",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {index: true, element: <OrderSuccess />},
      ]
    },
    {
      path: "/order-detail/:id",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {index: true, element: <OrderDetail />},
      ]
    },
    {
      path: "/product-details/:id",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {index: true, element: <ProductDetail />},
      ]
    },
    {
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {
          element: <ProtectedAdminRoute />,
          children: [
            { path: "/prod-management", element: <ProductManagement /> },
            { path: "/category-management", element: <CategoryManagement /> },
            { path: "/order-management", element: <OrderManagement /> },
            { path: "/user-management", element: <UserManagement /> },
            { path: "/color-management", element: <ColorManagement /> },
          ],
        },
      ],
    },
    {
      path: "/my-account",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {index: true, element: <MyAccount />},
      ]
    }
  ]);

  return (
    <AuthProvider>
      {!isLoading || 
        window.location.pathname === "/sign-in" ? 
        <RouterProvider router={router} /> : <Loading />}
    </AuthProvider>
  );
}
