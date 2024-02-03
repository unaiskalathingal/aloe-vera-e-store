import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/layout/AdminMenu";
import Layout from "../../componets/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/get-product/${params.id}`
      );

      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  // get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
      toast.error("Error while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", {
        category,
        name,
        description,
        price,
        quantity,
        shipping,
        photo,
      });

      const formData = new FormData();
      formData.append("category", category);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", String(shipping));

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axios.put(
        `http://localhost:4000/api/v1/product/update-product/${params.id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to product the product");
      }
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Error updating product");
    }
  };
    const handleDelete = async () => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this category?");
        if (confirmDeletion) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/v1/product/delete-product/${params.id}`);
      
               
                if (response.data.success) {
                    toast.success("Product deleted successfully!");
                    await navigate("/dashboard/admin/products"); } else {
                    toast.error("Failed to delete the product");
                }
            } catch (error) {
                console.error("Delete Error:", error);
                toast.error("Error on deleting product");
            }
        }
    };
  

  return (
    <Layout>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-3">
            <h2>Update Category</h2>
            <div className="m-1 col-md-8 p-3">
              <Form>
                <Form.Group controlId="categorySelect p-3">
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <div className="mb-3 m-3 col-md-3">
                  <label className="btn btn-outline-secondary">
                    {photo ? photo.name : `upload photo`}
                    <input
                      type="file"
                      name=""
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3 col-md-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        height={`200px`}
                        className="img img-reponsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`http://localhost:4000/api/v1/product/product-photo/${params.id}`}
                        height={`200px`}
                        className="img img-reponsive"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-8">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-8">
                  <Form.Control
                    as="textarea"
                    value={description}
                    placeholder="Enter Product Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-8">
                  <input
                    type="text"
                    value={price}
                    placeholder="Enter Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-8">
                  <input
                    type="text"
                    value={quantity}
                    placeholder="Enter Product Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-8">
                  <Form.Control
                    as="select"
                    value={shipping ? `yes` : `no`}
                    onChange={(e) => setShipping(e.target.value)}
                  >
                    <option value="">Select shipping</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Control>
                </div>

                <div className="mb-3 col-md-6">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Update
                  </button>
                </div>
                <div className="mb-3 col-md-6">
                  <button
                    type="delete"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
