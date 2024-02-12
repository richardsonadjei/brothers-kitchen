// Header.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Link to="/" className="logo-container">
          <Navbar.Brand className="logo d-flex align-items-center">
            <img
              src="/Brothers Kitchen.png" // Replace with the actual path to your logo
              alt="Logo"
              className="logo-img"
            />
            <span className="logo-text">Brothers Kitchen</span>
          </Navbar.Brand>
        </Link>

        {/* Date and time at the center of the vw (for smaller screens) */}
        <div className="current-date-time d-lg-none order-lg-2">
          {currentDateTime.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>

        {/* Date and time at the center of the vw (for larger screens) */}
        <div className="current-date-time d-none d-lg-block">
          {currentDateTime.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="menu-items justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="text-white font-weight-bold">
              Home
            </Nav.Link>

            {/* Reports dropdown */}
            <NavDropdown title="Reports" id="reports-dropdown" style={{ color: 'white', fontWeight: 'bold' }}>
              {currentUser?.role === 'employee' ? (
                <NavDropdown.Item as={Link} to="/daily-meat-sales-report">
                  Total Daily Meat Sales
                </NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/daily-meat-sales-report">
                    Total Daily Meat Sales
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/period-meat-sales-report">
                    Sales Report
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ingedient-purchase-report">
                    Ingredients Expense Report 
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/gas-purchase-report">
                    Gas Purchase Report 
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/bowls-purchase-report">
                    Bowls And Plates Purchase Report 
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/assets-purchase-report">
                    Assets Purchase Report 
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/other-consumable-purchase-report">
                  Other Consumables Purchase Report 
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/income-variations-report">
                Income Variations Report
              </NavDropdown.Item>
                  {/* Add more reports as needed */}
                </>
              )}
            </NavDropdown>

            {/* Meat Issue dropdown */}
            <NavDropdown title="Meat Issue" id="meat-issue-dropdown" style={{ color: 'white', fontWeight: 'bold' }}>
              <NavDropdown.Item as={Link} to="/bulk-meat-issue">
                Issue Meat
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/bulk-meat-issue-report">
                View Meats Issued
              </NavDropdown.Item>
             
            </NavDropdown>

            {/* Expense dropdown */}
            <NavDropdown title="Expense" id="expense-dropdown" style={{ color: 'white !important', fontWeight: 'bold' }}>
              <NavDropdown.Item as={Link} to="/purchase-ingreident">
              Purchase Food Ingredients 
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/other-consumable-purchase">
              Purchase Other Consumable  
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gas-purchase">
                Purchase Gas  
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/plates-purchase">
                Purchase Plates And Bowl 
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/business-assets-purchase">
                Purchase Business Asset
              </NavDropdown.Item>

              {/* Add more expense items as needed */}
            </NavDropdown>
              {/* Expense dropdown */}
              <NavDropdown title="Extras" id="expense-dropdown" style={{ color: 'white !important', fontWeight: 'bold' }}>
              <NavDropdown.Item as={Link} to="/new-meat-type">
                Add New Item To Sell
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-other-expense">
                View All Items
              </NavDropdown.Item>
             

              {/* Add more expense items as needed */}
            </NavDropdown>

            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/profile" className="text-white font-weight-bold">
                  <span>{currentUser.userName}</span>
                </Nav.Link>

                <Nav.Link as={Link} to="/sign-out" className="text-white font-weight-bold">
                  Sign Out
                </Nav.Link>

                {currentUser.role === 'ceo' && (
                  <Nav.Link as={Link} to="/sign-up" className="text-white font-weight-bold">
                    Create New User
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/sign-in" className="text-white font-weight-bold">
                  Sign In
                </Nav.Link>

                {/* Show "Sign Up" only if the role is not "employee" or "manager" */}
                {currentUser?.role !== 'employee' && currentUser?.role !== 'manager' && (
                  <Nav.Link as={Link} to="/sign-up" className="text-white font-weight-bold">
                    Create New User
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
