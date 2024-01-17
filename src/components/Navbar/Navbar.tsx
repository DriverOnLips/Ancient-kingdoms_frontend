import { useNavigate } from 'react-router-dom';
import { Container, Navbar }from 'react-bootstrap';

import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';


function NavbarUser() {
  const navigate = useNavigate()

 return (
  <div>
    <Navbar expand="lg" fixed='top'
    className="navbar bg-body-tertiary d-flex justify-content-between">
      <Container className='navbar-elements'>
        <Navbar.Brand className='navbar-logo text-h2-medium'
          onClick={() => navigate('/Ancient-kingdoms_frontend/kingdom')}>
            ARK
        </Navbar.Brand>
        <Breadcrumbs />
      </Container>
    </Navbar>
    <div className='navbar-padding'/>
  </div>
 );
}

export default NavbarUser;
