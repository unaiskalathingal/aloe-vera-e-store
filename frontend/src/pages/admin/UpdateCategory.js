import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/layout/AdminMenu";
import Layout from "../../componets/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null); // Initialize photo state as null

  const getSingleCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/category/get-category/${params.id}`
      );

      setName(data.getOne.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCategory();
  }, []);

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", {
        name,
        photo,
      });

      const formData = new FormData();

      formData.append("name", name);

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/category/update-category/${params.id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Category updated successfully!");
        navigate("/dashboard/admin/categories"); // Corrected route
      } else {
        toast.error("Failed to update the category");
      }
    } catch (error) {
      console.error("Error updating category", error);
      toast.error("Error updating category");
    }
  };

  const handleDelete = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDeletion) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/category/delete-category/${params.id}`
        );

        if (response.data.success) {
          toast.success("Category deleted successfully!");
          await navigate("/dashboard/admin/categories"); // Corrected route
        } else {
          toast.error("Failed to delete the category");
        }
      } catch (error) {
        console.error("Delete Error:", error);
        toast.error("Error on deleting category");
      }
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]); // Corrected file change handling
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
                <div className="mb-3 m-3 col-md-3">
                  <label className="btn btn-outline-secondary">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name=""
                      accept="image/*"
                      onChange={handleFileChange}
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
                        alt="Category"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/category/category-photo/${params.id}`}
                        height={`200px`}
                        className="img img-reponsive"
                        alt="Category"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-8">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Category Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
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

export default UpdateCategory;
