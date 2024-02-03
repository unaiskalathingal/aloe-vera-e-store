import React, { useEffect, useState } from "react";
import Layout from "../../componets/layout/Layout";
import UserMenu from "../../componets/layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";
const Profile = () => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
  });
  useEffect(() => {
    console.log("Form data changed:", formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (formData.mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return;
    }

    try {
      const dataToSend = {
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
      };

      const res = await axios.put(
        "http://localhost:4000/api/v1/auth/profile",
        dataToSend
      );

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        // Update only the user information, not the token
        setAuth({ ...auth, user: res.data.updatedUser, token: auth.token });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updatedUser;
        // Do not update the token here
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully  And Please login again");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (auth.user) {
      const { name, email, mobile, password, address } = auth.user;

      setFormData({
        ...formData,
        name,
        email,
        mobile,
        password,
        address,
      });
    }
  }, [auth.user]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 ">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
