import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../../context/auth";
import Dropdown from 'react-bootstrap/Dropdown';
import { useCart } from "../../context/Cart";



const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart]=useCart()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/"> 𝐚𝐥𝐨𝐞 𝐯𝐞𝐫𝐚</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/Register">Register</Nav.Link>
                <Nav.Link as={Link} to="/Login">Login</Nav.Link>
              </>
            ) : (
                <>
                <Dropdown>
                <Dropdown.Toggle variant="" className="navadashbtn  ">
                  {auth?.user?.name.toUpperCase()}
                </Dropdown.Toggle>
          
                <Dropdown.Menu>
                  <Dropdown.Item href={`/dashboard/${auth?.user?.role===1 ? "admin" : "user"}`} >Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                
              </>
            )}
            <Nav.Link as={Link} to="/cart"> Cart {cart?.length}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
