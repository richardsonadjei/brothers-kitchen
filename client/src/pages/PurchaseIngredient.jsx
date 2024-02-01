import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Alert } from 'reactstrap';
import { useSelector } from 'react-redux';

const PurchaseIngredients = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [description, setDescription] = useState([]);

  const handleAddItem = () => {
    const newItem = {
      itemName: '',
      amount: 0, // Updated from unitPrice and quantity to amount
    };
    setDescription([...description, newItem]);
  };

  const handleDescriptionChange = (index, field, value) => {
    const updatedDescription = [...description];
    updatedDescription[index][field] = value;
    setDescription(updatedDescription);
  };

  const handleRemoveItem = (index) => {
    const updatedDescription = [...description];
    updatedDescription.splice(index, 1);
    setDescription(updatedDescription);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/record-ingredient-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          purchaseDate,
          recordedBy: currentUser ? currentUser.userName : '', // Use currentUser as the default value
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Show success message
      alert('Ingredient purchase recorded successfully');

      // Navigate to '/' after 3 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      // Handle errors and show an error message
      console.error('Error recording ingredient purchase:', error);
      alert('Error recording ingredient purchase');
    }
  };

  return (
    <Container>
      <h2>Purchase Ingredients</h2>
      <Form>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Amount</th> {/* Updated from Unit Price and Quantity */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {description.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Input
                        type="text"
                        value={item.itemName}
                        onChange={(e) => handleDescriptionChange(index, 'itemName', e.target.value)}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleDescriptionChange(index, 'amount', parseFloat(e.target.value))}
                      />
                    </td>
                    <td>
                      <Button color="danger" onClick={() => handleRemoveItem(index)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="purchaseDate">Purchase Date</Label>
              <Input
                type="date"
                name="purchaseDate"
                id="purchaseDate"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                name="recordedBy"
                id="recordedBy"
                value={currentUser ? currentUser.userName : ''} // Use currentUser as the default value
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>

        <Button color="success" onClick={handleSubmit}>
          Record Purchase
        </Button>
      </Form>
    </Container>
  );
};

export default PurchaseIngredients;
