import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/layout/AdminMenu";
import Layout from "../../componets/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error(`error on fething products`);
    }
  };
  //lifecyle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All products</h1>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-2 mb-3" key={p._id}>
                <Link key={p._id} to={`/Dashboard/admin/product/${p._id}`} className="text-decoration-none">
                  <Card className="card" style={{ width: "8rem" }}>
                    <Card.Img variant="top" src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                    <Card.Body>
                      <Card.Title>{p.name}</Card.Title>
                     
                      <Card.Text>Price: ₹{p.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;