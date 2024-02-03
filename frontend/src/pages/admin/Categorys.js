import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/layout/AdminMenu";
import Layout from "../../componets/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";


const Categories = () => {
  const [categories, setCategories] = useState([]);

  //get all products
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/category/get-category`
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error(`error on fething category`);
    }
  };
  //lifecyle method
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
    <div className="container-fluid m-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Categories</h1>
          <div className="row">
            {categories?.map((c) => (
              <div className="col-md-4 mb-3" key={c._id}>
                <Link key={c._id} to={`/Dashboard/admin/Category/${c._id}`} className="text-decoration-none">
                  <Card className="card" style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/Category/Category-photo/${c._id}`} alt={c.name} />
                    <Card.Body>
                      <Card.Title>{c.name}</Card.Title>
                     
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Categories;