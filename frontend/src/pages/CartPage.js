import React, { useEffect, useState } from "react";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import Layout from "../componets/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [codSelected, setCodSelected] = useState(false);
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        const itemPrice = parseFloat(item.price);
        if (!isNaN(itemPrice)) {
          total = total + itemPrice;
        }
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      try {
        // any additional logic you may want to perform
      } catch (error) {
        console.log(error);
      }
      return updatedCart;
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
  
      if (codSelected) {
        console.log("Processing Cash on Delivery...");
  
        const response = await axios.post(
          "http://localhost:4000/api/v1/product/cod/checkout",
          {
            cart,
          }
        );
  
        console.log("Server response:", response);
  
        if (response.status === 200) {
          console.log("COD payment successful");
          setLoading(false);
          // Clear the cart
          setCart([]);
          localStorage.removeItem("cart");
          // Navigate to orders page or show a success message
          navigate("/dashboard/user/orders");
          toast.success("Order placed successfully (COD)");
        } else {
          console.error("COD payment failed");
          toast.error("COD payment failed");
        }
      } else {
        // Razorpay payment logic
        console.log("Processing Razorpay Payment...");
  
        const response = await axios.post(
          "http://localhost:4000/api/v1/product/razorpay/checkout",
          {
            cart,
          }
        );
  
        if (response.status === 200) {
          const options = {
            key: "rzp_test_QIpteCb4AOYEYV",
            amount: response.data.amount,
            currency: "INR",
            name: "HOME MADE ALOE VERA PRODUCTS",
            description: "Payment for products",
            order_id: response.data.orderId,
            handler: function (response) {
              // Handle success
              console.log(response);
              setLoading(false);
              // Clear the cart
              setCart([]);
              localStorage.removeItem("cart");
              // Navigate to orders page or show a success message
              navigate("/dashboard/user/orders");
              toast.success("Order placed successfully (Razorpay)");
            },
            prefill: {
              name: auth.user.name,
              email: auth.user.email,
            },
            theme: {
              color: "#3399cc",
            },
          };
  
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          console.error("Razorpay payment failed");
          toast.error("Razorpay payment failed");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Error processing payment");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {auth?.token && <p>Hello {auth?.user?.name}</p>}
            </h1>
            {auth?.token ? (
              <h4 className="text-center">
                {cart?.length > 0
                  ? `You have ${cart.length} item${
                      cart.length > 1 ? "s" : ""
                    } in your cart`
                  : "Your cart is empty"}
              </h4>
            ) : (
              <h4 className="text-center">
                Please Login to view your profile{" "}
              </h4>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart.map((product) => (
              <div
                key={product._id}
                className="row mb-2 p-2 card bg-light flex-row"
              >
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <p>Name :{product.name}</p>
                  <p> Description:{product.description.substring(0, 30)}</p>
                  <p>Price :{product.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | CheckOut | Payment</p>
            <hr />
            <h4>Total :{totalPrice()}</h4>
            {auth?.token && <h5>Shipping Address :{auth?.user?.address}</h5>}
            {auth?.token ? (
              <button
                className="btn btn-outline-warning"
                onClick={() => handleNavigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => navigate("/login", { state: { from: "/cart" } })}
              >
                Log In to CheckOut
              </button>
            )}
            <div className="mt-2 mb-4">
            <label className="mt-2">
            <input
              type="checkbox"
              checked={codSelected}
              onChange={() => setCodSelected(!codSelected)}
            />{" "}
            Pay with Cash on Delivery
          </label>
        <button
          className="btn btn-success"
          onClick={handlePayment}
          disabled={loading || !auth?.user?.address || cart.length === 0}
        >
          {loading ? "Processing Payment..." : "Make Payment"}
        </button>
        
      </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;