import React from "react";
import Layout from "../../componets/layout/Layout";
import AdminMenu from "../../componets/layout/AdminMenu";

const Users = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> all users here</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
