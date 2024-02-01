import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BusinessAssetsPurchase = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [purchasedBy, setPurchasedBy] = useState(currentUser ? currentUser.userName : '');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePurchasedByChange = (event) => {
    setPurchasedBy(event.target.value);
  };

  const handleBusinessAssetsPurchase = async () => {
    try {
      // Validate input fields
      if (!amount || !description) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      // Make a fetch request to record business assets purchase
      const response = await fetch('/api/business-assets-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, description, purchasedBy }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Business assets purchase recorded successfully');
        setErrorMessage('');
        // Redirect to home page after successful record
        setTimeout(() => navigate('/'), 2000);
      } else {
        setErrorMessage(`Error: ${data.message}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error recording business assets purchase:', error);
      setErrorMessage('Internal Server Error');
      setSuccessMessage('');
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Business Assets Purchase Form</h2>

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
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
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

        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}

        <Button color="primary" onClick={handleBusinessAssetsPurchase}>
          Record Business Assets Purchase
        </Button>
      </Form>
    </Container>
  );
};

export default BusinessAssetsPurchase;
