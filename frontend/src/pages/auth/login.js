import "../../index.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import Layout from './../../componets/layout/Layout';
import { useAuth } from "../../context/auth";
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth()
  
  const navigate = useNavigate();
  const location=useLocation()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`, 
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        toast.success('Login successful');
        setAuth({
          ...auth,
          user: res.data.user,
          token:res.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data))
        navigate(location.state||"/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Cheak Your Email & Password');
    }
  };

  return (
    <Layout>
    <div className="register">
      <h1 style={{ color: "black", fontFamily: "Courier, monospace" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input
            required={true}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email address"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
            <input
            required={true}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
          </button>
          <div className="mb-3">
            <Link style={{color:"red"}} to="/forget-password">Forgot Password?</Link>
          </div>
      </form>
      </div>
      </Layout>
  );
};



export default Login;
