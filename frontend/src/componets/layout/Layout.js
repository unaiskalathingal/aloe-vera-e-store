import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';


const Layout = ({children}) => {
  return (
    <div>
      <Header />
      <main style={{minHeight :"80vh"}}>
      <Toaster />
        { children}
          </main>
          <Footer/>
    </div>
  );
};

export default Layout;
