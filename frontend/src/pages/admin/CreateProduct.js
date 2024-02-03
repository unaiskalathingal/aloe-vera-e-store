import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/layout/AdminMenu";
import Layout from "../../componets/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/category/get-category`
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

      formData.append("photo", photo);

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/product/add-product`,
        formData
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to add the product");
      }
    } catch (error) {
      console.error("Error submitting product", error);
      toast.error("Error submitting product");
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
            <div className="m-1 col-md-8 p-3">
              <Form onSubmit={handleSubmit}>
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
                      required={true}
                      type="file"
                      name=""
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3 col-md-3">
                  {photo && (
                    <div className="text-center">
                      <img
                      required={true}
                        src={URL.createObjectURL(photo)}
                        height={`200px`}
                        className="img img-reponsive"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-8">
                  <input
                  required={true}
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
                    required={true}
                    placeholder="Enter Product Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-8">
                  <input
                    type="text"
                    required={true}
                    value={price}
                    placeholder="Enter Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-8">
                  <input
                    type="text"
                    required={true}
                    value={quantity}
                    placeholder="Enter Product Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-8">
                  <Form.Control
                    as="select"
                    required={true}
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                  >
                    <option value="">Select shipping</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Control>
                </div>

                <div className="mb-3 col-md-8">
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default CreateProduct;
