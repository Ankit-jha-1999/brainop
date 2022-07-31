import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <section className="nav-container">
         <div className="nav-logo">
            <h1 className="logo">Brain<span>OP</span></h1>
         </div>
         <div className="nav-buttons">
            <a className="btn" href="#">Home</a>
            <a className="btn" href="#">Dashboard</a>
            <a className="btn" href="#">Statistics</a>
            <a className="btn" href="#">Your Activity</a>
            <button className="login">Login</button>
            <button className="signup">Sign Up</button>
         </div>
      </section>
    </>
  );
};

export default Navbar;
