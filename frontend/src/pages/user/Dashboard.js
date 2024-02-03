import React from "react";
import Layout from "./../../componets/layout/Layout";
import UserMenu from "../../componets/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 bg-info text-white">
              <h4 className="mb-4">User Information</h4>
              <div className="user-info">
                <p>
                  <strong>Name:</strong> {auth?.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {auth?.user?.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {auth?.user?.mobile}
                </p>
                <p>
                  <strong>Address:</strong> {auth?.user?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
