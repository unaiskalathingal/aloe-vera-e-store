import React, { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from './../../componets/layout/Layout';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState(null);
// navigate is the obeject from usenaviagte 
  const navigate = useNavigate();

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

    if (!/[a-zA-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      setError("Password must contain both letters and numbers");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        formData
      );

      if (res.data.success) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        setError(res.data.message || "An unknown error occurred");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="register">
      <h1 style={{ color: "black", fontFamily: "Courier, monospace" }}>
        Register
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
          required={true}
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
          required={true}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
          required={true}
            type="tel"
            name="mobile"
            className="form-control"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            required={true}
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
          required={true}
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
  );
};

const Registration = () => {
  return (
    <Layout>
      <RegistrationForm />
    </Layout>
  );
};

export default Registration;
