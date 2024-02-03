import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

import UserMenu from './../../componets/layout/UserMenu';
import Layout from './../../componets/layout/Layout';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/auth/orders"
      );
      setOrders(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-2">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="border shadow">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Images</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Total.Qty</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.products.map((product, productIndex) => (
                        <div key={productIndex} style={{ marginRight: '10px' }}>
                          <img
                            src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            style={{ width: '150px', height: '100px' }}
                          />
                        </div>
                      ))}
                    </td>
                    <td>
                      {order.products.map((product, productIndex) => (
                        <div key={productIndex}>
                          <p>{product.name}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {order.products.map((product, productIndex) => (
                        <div key={productIndex}>
                          <h5>₹ {product.price}/-</h5>
                        </div>
                      ))}
                    </td>
                    <td>
                      {/* Log the order object */}
                      {console.log(order)}

                      {/* Log the payment method */}
                      {console.log(order.payment.payment_method)}

                      {order.payment.payment_method === 'COD' ? 'COD' : 'Online'}
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

export default Orders;
