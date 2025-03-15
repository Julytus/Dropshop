import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";

const Error404 = () => {
  return (
    <div>
      <Header />
      <div
        className="section-404 section"
        style={{ backgroundImage: "url('assets/images/bg/bg-404.webp')" }}
      >
        <div className="container">
          <div className="content-404">
            <h1 className="title">Oops!</h1>
            <h2 className="sub-title">Page not found!</h2>
            <p>You could either go back or go to homepage</p>
            <div className="buttons">
              <a className="btn btn-primary btn-outline-hover-dark" href="/">
                Go back
              </a>
              <a className="btn btn-dark btn-outline-hover-dark" href="/">
                Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Error404;


