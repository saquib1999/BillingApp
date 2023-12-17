import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <>
      <Navbar bg="black" data-bs-theme="dark">
        <Container>
          <NavLink to="/">
            <Navbar.Brand className="btn"> HOME</Navbar.Brand>
          </NavLink>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink className="btn" to="products">
                Products
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="btn" to="medicals">
                Medicals
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="btn" to="bills">
                Bills
              </NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
