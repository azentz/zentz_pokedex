import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const pathname: string = useLocation().pathname;

  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand as={Link} to="/">{t('pokedex')}</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey="1" as={Link} to="/" active={pathname === '/'}>{t('home')}</Nav.Link>
              <Nav.Link eventKey="2" as={Link} to="/about" active={pathname === '/about'}>{t('about')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* NOTE: this is a simple way to match spacing of fixed nav above, so content is not hidden under nav */}
      <Navbar expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">{t('pokedex')}</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
