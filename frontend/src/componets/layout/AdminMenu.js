import React from "react";
import { NavLink } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Orders from './../../pages/user/Orders';

const AdminMenu = () => {
  return (
    <>
          <div className="text-center">
              <h4>Admin Panel</h4>
        <ListGroup as="ul">
          <ListGroup.Item as={NavLink} to="/dashboard/admin/create-Category" activeClassName="active">
            Create Category
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/create-product" activeClassName="active">
            Create Product
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/Categories" activeClassName="active">
            Categories
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/products" activeClassName="active">
            Products
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/users" activeClassName="active">
            Users
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/orders" activeClassName="active">
            Orders
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default AdminMenu;
