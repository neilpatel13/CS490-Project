import { Nav, Navbar, Container } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>CrushIt</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/'>
              <Nav.Link>
                <FaSignInAlt /> Sign In
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
              <Nav.Link>
                <FaSignOutAlt /> Sign up
              </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    );
  };
export default Header;
  
