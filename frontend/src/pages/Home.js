import React from "react";
import HomeCategories from "./HomeCategories";
import { useAuth } from "../context/auth";
import axios from "axios";
import Layout from "../componets/layout/Layout";

const Home = () => {
  // Add any logic or data fetching you need

  return (
    <Layout>
      <div
        style={{
          background: `url('https://st4prdbebeautiful4s4ci.blob.core.windows.net/www-bebeautiful-in/Try-out-this-aloe-vera-facial-at-home-for-healthy-glowing-skin_mobilehome.jpg')`, // Use url() to load external images
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Adjust as needed
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white", // Text color
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            backgroundColor: "rgba(128, 128, 128, 0.7)",
            padding: "10px",
          }}
        >
          Welcome to  Natural Products E-Store
        </h1>
        <p style={{ fontSize: "1.7rem" }}>Its Complete Homemade Products</p>
        <p style={{ fontSize: "1.5rem" }}>buy original narural  products in your fingertips</p>
      </div>
      <HomeCategories />
    </Layout>
  );
};
export default Home;