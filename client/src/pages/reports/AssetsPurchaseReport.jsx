import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';

const AssetsPurchaseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assetsPurchases, setAssetsPurchases] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make a fetch request to retrieve assets purchases within the specified period
      const response = await fetch(`/api/view-assets-purchases?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (data.success) {
        setAssetsPurchases(data.assetsPurchases);
      }
    } catch (error) {
      console.error('Error retrieving assets purchases:', error);
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
      <h2 className="mt-4 mb-4">Business Assets Purchase Report</h2>

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

      {assetsPurchases.length > 0 && (
        <>
          <h3 className="mt-4 mb-4">Business Assets Purchase Details</h3>

          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Purchase Date</th>
                <th>Assets Purchase Number</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Purchased By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assetsPurchases.map((purchase, index) => (
                <tr key={purchase._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(purchase.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td>{purchase.businessAssetsPurchaseNumber}</td>
                  <td>{purchase.description}</td>
                  <td>{purchase.amount}</td>
                  <td>{purchase.purchasedBy}</td>
                  <td>
                    <Button color="info" onClick={() => viewDetails(purchase)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for displaying details */}
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Details for Record</ModalHeader>
            <ModalBody>
              {selectedRecord && (
                <div>
                  <p>Category: {selectedRecord.category}</p>
                  <p>Description: {selectedRecord.description}</p>
                  <p>Amount: {selectedRecord.amount}</p>
                  <p>Purchased By: {selectedRecord.purchasedBy}</p>
                  <p>Purchase Date: {new Date(selectedRecord.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>Assets Purchase Number: {selectedRecord.businessAssetsPurchaseNumber}</p>
                  {/* Add more details as needed */}
                </div>
              )}
            </ModalBody>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default AssetsPurchaseReport;
