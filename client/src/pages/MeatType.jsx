import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const RecordMeatType = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-meat-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`Error recording meat type: ${response.statusText}`);
      }

      // Show success message or handle success as needed
      alert('Meat type recorded successfully');
      setName(''); // Reset the input field
    } catch (error) {
      console.error('Error recording meat type:', error);
      setError(error.message);
    }
  };

  return (
    <Container>
      <h2>Record Meat Type</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="meatTypeName">Meat Type Name</Label>
              <Input
                type="text"
                id="meatTypeName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button color="primary" type="submit">
          Record Meat Type
        </Button>
      </Form>
    </Container>
  );
};

export default RecordMeatType;
