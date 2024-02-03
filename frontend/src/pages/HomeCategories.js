import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/category/get-category/`
      );
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProducts = (categoryId) => {
    // Navigate to the category-specific page when the card is clicked
    navigate(`/category/${categoryId}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {categories.map((category) => (
          <div
            key={category._id}
            className="col-md-4 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => handleViewProducts(category._id)}
          >
            <div className="card">
              {category.photo && category.photo.data ? (
                <Link to={`/category/${category._id}`}>
                  <img
                    className="card-img-top"
                    src={`data:${category.photo.contentType};base64,${btoa(
                      new Uint8Array(category.photo.data.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt={category.name}
                    style={{ height: "200px" }}
                  />
                </Link>
              ) : (
                <div className="text-center p-4">
                  <p>No image available</p>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                <Link to={`/category/${category._id}`} className="btn btn-success">
                  View Products
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
