import React from "react";
import { NavLink } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>Dashborad</h4>
        <ListGroup as="ul">
          <ListGroup.Item
            as={NavLink}
            to="/dashboard/user/profile"
            activeClassName="active"
          >
            Profile
          </ListGroup.Item>
          <ListGroup.Item
            as={NavLink}
            to="/dashboard/user/orders"
            activeClassName="active"
          >
            Orders
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default UserMenu;
