import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="home-container">
      <Container>
        <marquee style={{ color: 'purple', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginBottom: '10px', marginTop: '10px' }}>
          Welcome to Brothers Kitchen, <span style={{ color: 'orange', fontSize: '30px' }}>{(currentUser?.userName || 'Guest').toUpperCase()}</span>!
        </marquee>

        <Row className="gx-3">
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Link to="/add-meat-sale">
              <Card className="animated-card card-sales" style={{ background: `url("/orphiles 1.png")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '200px', borderRadius: '15px', border: '2px solid white' }}>
                <Card.Body>
                  <FaUtensils className="icon" style={{ color: '#FFA500' }} />
                  <Card.Title style={{ textDecoration: 'none', color: 'white', fontSize: '24px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>Meat Sales</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={4} sm={6} xs={12} className="mb-3">
            <Link to="/buy-fuel">
              <Card className="animated-card card-expense" style={{ background: `url("/fufu.jpg")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '200px', borderRadius: '15px', border: '2px solid white' }}>
                <Card.Body>
                  <FaUtensils className="icon" style={{ color: '#FFA500' }} />
                  <Card.Title style={{ color: 'white', fontSize: '24px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>Fufu And Meat</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={4} sm={6} xs={12} className="mb-3">
            <Link to="/report">
              <Card className="animated-card card-report" style={{ background: `url("path/to/your/image3.jpg")`, backgroundSize: 'cover', height: '200px', borderRadius: '15px', border: '2px solid white' }}>
                <Card.Body>
                  <FaUtensils className="icon" style={{ color: '#FFA500' }} />
                  <Card.Title style={{ color: 'white', fontSize: '18px' }}>Report</Card.Title>
                  {/* ... buttons for reports ... */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
