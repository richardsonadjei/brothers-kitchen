import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';

const IngredientPurchaseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ingredientPurchases, setIngredientPurchases] = useState([]);
  const [summaryReport, setSummaryReport] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make a fetch request to retrieve ingredient purchases within the specified period
      const response = await fetch(`/api/view-ingredient-purchases?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (data.success) {
        setIngredientPurchases(data.ingredientPurchases);

        // Generate summary report
        const overallTotal = data.ingredientPurchases.reduce((total, purchase) => {
          const purchaseAmount = purchase.description.reduce((itemTotal, item) => itemTotal + item.amount, 0);
          return total + purchaseAmount;
        }, 0);
        setSummaryReport({ overallTotal });
      }
    } catch (error) {
      console.error('Error retrieving ingredient purchases:', error);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const viewDetails = (record) => {
    setSelectedRecord(record);
    toggleModal();
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Ingredient Purchase Report</h2>

      <Form>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input type="date" name="startDate" id="startDate" value={startDate} onChange={handleStartDateChange} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input type="date" name="endDate" id="endDate" value={endDate} onChange={handleEndDateChange} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <Button color="primary" onClick={handleSubmit}>
              Generate Report
            </Button>
          </Col>
        </Row>
      </Form>

      {ingredientPurchases.length > 0 && (
        <>
          <h3 className="mt-4 mb-4">Ingredient Purchase Details</h3>

          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Purchase Date</th>
                <th>Recorded By</th>
                <th>Ingredient Purchase Number</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ingredientPurchases.map((purchase, index) => (
                <tr key={purchase._id}>
                  <td>{index + 1}</td>
                  <td>{purchase.description.map((item) => item.itemName).join(', ')}</td>
                  <td>{new Date(purchase.purchaseDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td>{purchase.recordedBy}</td>
                  <td>{purchase.ingredientPurchaseNumber}</td>
                  <td>{purchase.description.reduce((total, item) => total + item.amount, 0)}</td>
                  <td>
                    <Button color="info" onClick={() => viewDetails(purchase)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {summaryReport && (
            <>
              <h3 className="mt-4 mb-4">Summary Report</h3>
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>Overall Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{summaryReport.overallTotal}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </>
      )}

      {/* Modal for displaying details */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Details for Record</ModalHeader>
        <ModalBody>
          {selectedRecord && (
            <div>
              <p>Purchase Date: {new Date(selectedRecord.purchaseDate).toLocaleDateString()}</p>
              <p>Recorded By: {selectedRecord.recordedBy}</p>
              <p>Ingredient Purchase Number: {selectedRecord.ingredientPurchaseNumber}</p>
              <h5>Description:</h5>
              <ul>
                {selectedRecord.description.map((item, index) => (
                  <li key={index}>
                    <p>Item: {item.itemName}</p>
                    <p>Amount: {item.amount}</p>
                  </li>
                ))}
              </ul>
              {/* Add more details as needed */}
            </div>
          )}
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default IngredientPurchaseReport;
