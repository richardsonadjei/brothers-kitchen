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

        <Row className="gx-3 justify-content-center align-items-center">
          <Col md={6} sm={10} xs={12} className="mb-3">
            <Link to="/add-meat-sale">
              <Card className="animated-card card-sales" style={{ background: `url("/orphiles 1.png")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '200px', borderRadius: '15px', border: '2px solid white' }}>
                <Card.Body>
                  <FaUtensils className="icon" style={{ color: '#FFA500' }} />
                  <Card.Title style={{ textDecoration: 'none', color: 'white', fontSize: '24px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>Sell Food</Card.Title>
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
