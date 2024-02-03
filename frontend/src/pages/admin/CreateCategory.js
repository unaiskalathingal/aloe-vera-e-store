import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/layout/AdminMenu";
import Layout from "../../componets/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();
  

  const [name, setName] = useState("");
 
  const [photo, setPhoto] = useState("");



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
      

      formData.append("photo", photo);

      const response = await axios.post(
        "http://localhost:4000/api/v1/category/create-category",
        formData
      );

      if (response.data.success) {
        toast.success("category added successfully!");
        navigate("/dashboard/admin/Categories");
      } else {
        toast.error("Failed to add the category");
      }
    } catch (error) {
      console.error("Error submitting category", error);
      toast.error("Error submitting category");
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

export default CreateCategory;
