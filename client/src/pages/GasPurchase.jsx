import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GasPurchase = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [amount, setAmount] = useState('');
  const [purchasedBy, setPurchasedBy] = useState(currentUser ? currentUser.userName : '');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePurchasedByChange = (event) => {
    setPurchasedBy(event.target.value);
  };

  const handleGasPurchase = async () => {
    try {
      // Validate input fields
      if (!amount) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      // Make a fetch request to record gas purchase
      const response = await fetch('/api/gas-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, purchasedBy }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Gas purchase recorded successfully');
        setErrorMessage('');
        // Redirect to home page after successful record
        setTimeout(() => navigate('/'), 2000);
      } else {
        setErrorMessage(`Error: ${data.message}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error recording gas purchase:', error);
      setErrorMessage('Internal Server Error');
      setSuccessMessage('');
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Gas Purchase Form</h2>
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="purchasedBy">Purchased By</Label>
              <Input
                type="text"
                name="purchasedBy"
                id="purchasedBy"
                value={purchasedBy}
                onChange={handlePurchasedByChange}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>

    

        <Button color="primary" onClick={handleGasPurchase}>
          Record Gas Purchase
        </Button>
      </Form>
    </Container>
  );
};

export default GasPurchase;
