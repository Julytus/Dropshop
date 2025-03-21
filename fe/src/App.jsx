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
import MyAccount from "./pages/myaccount";
import ProductDetail from "./pages/productdetail";
import Error404 from "./components/error404";
import Loading from "./components/loading";
import AuthProvider from "./components/AuthProvider";
import Checkout from './pages/checkout';
import OrderSuccess from './pages/ordersuccess';
import OrderDetail from './pages/orderdetail';
import './styles/ordersuccess.css';

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
      path: "/admin/product",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {index: true, element: <ProductManagement />},
      ]
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
