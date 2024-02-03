import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/layout/AdminMenu";
import Layout from "../../componets/layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "not process",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]);
  const [changeStatus, setChangesStatus] = useState(``);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/allorders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStausChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Product</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Total.Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {
                          <select
                            bordered={false}
                            onChange={(event) =>
                              handleStausChange(order._id, event.target.value)
                            }
                            defaultValue={order.status}
                          >
                            {status.map((sts, index) => (
                              <option key={index} value={sts}>
                                {sts}
                              </option>
                            ))}
                          </select>
                        }
                      </td>
                      <td>{order.buyer.name}</td>
                      <td>
                        {order.products.map((product, productIndex) => (
                          <div key={productIndex}>
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                              alt={product.name}
                              style={{ width: "100px", height: "50px" }}
                            />
                            <p>{product.name}</p>
                            <h5>₹ {product.price}/-</h5>
                          </div>
                        ))}
                      </td>

                      <td>
                        {/* Extract the specific value for payment and render it */}
                        {order.payment.payment_method === "COD"
                          ? "COD"
                          : "Other"}
                      </td>
                      <td>{order.products.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
