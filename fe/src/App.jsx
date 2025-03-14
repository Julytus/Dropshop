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
import Error404 from "./components/error404";
import Loading from "./components/loading";
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
      path: "/home",
      element: <Layout />,
      errorElement: <Error404 />,

      children: [
        {index: true, element: <Home />},
      ]
    },
    {
      path: "/",
      errorElement: <Error404 />,
      children: [
        {index: true, element: <Home />},
      ]
    }
  ]);

  return (
    <>
      {!isLoading || 
        window.location.pathname === "/login" ||
        window.location.pathname === "/register" ? 
        <RouterProvider router={router} /> : <Loading />}
    </>
  );
}
