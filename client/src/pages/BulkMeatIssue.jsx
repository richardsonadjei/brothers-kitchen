import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import { useSelector } from 'react-redux';

const CreateBulkMeatIssue = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [meats, setMeats] = useState([]);
  const [recordedBy, setRecordedBy] = useState(currentUser ? currentUser.userName : '');

  const handleAddItem = () => {
    const newItem = {
      type: '',
      quantity: 0,
    };
    setMeats([...meats, newItem]);
  };

  const handleMeatChange = (index, field, value) => {
    const updatedMeats = [...meats];
    updatedMeats[index][field] = value;
    setMeats(updatedMeats);
  };

  const handleRemoveItem = (index) => {
    const updatedMeats = [...meats];
    updatedMeats.splice(index, 1);
    setMeats(updatedMeats);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/create-bulk-meat-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meats,
          recordedBy,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Show success message
      alert('Bulk meat issue recorded successfully');

      // Navigate to '/' after 3 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      // Handle errors and show an error message
      console.error('Error recording bulk meat issue:', error);
      alert('Error recording bulk meat issue');
    }
  };

  return (
    <Container>
      <h2>Create Bulk Meat Issue</h2>
      <Form>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Meat Type</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {meats.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Input
                        type="select"
                        value={item.type}
                        onChange={(e) => handleMeatChange(index, 'type', e.target.value)}
                      >
                        <option value="">Select Meat Type</option>
                        <option value="Intestines">Intestines</option>
                        <option value="Legs">Legs</option>
                        <option value="Liver">Liver</option>
                        <option value="Head">Head</option>
                      </Input>
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleMeatChange(index, 'quantity', parseInt(e.target.value))}
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
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                name="recordedBy"
                id="recordedBy"
                value={recordedBy}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>

        <Button color="success" onClick={handleSubmit}>
          Record Bulk Meat Issue
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBulkMeatIssue;
