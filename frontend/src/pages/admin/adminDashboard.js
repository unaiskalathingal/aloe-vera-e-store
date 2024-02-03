import React from "react";
import Layout from "../../componets/layout/Layout";
import AdminMenu from "../../componets/layout/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9"> <div className="alert alert-info">
          <h4 className="alert-heading">Welcome Admin!</h4>
          <p>
            You have successfully logged in as an administrator. Explore the
            dashboard and manage your content.
          </p>
        </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
