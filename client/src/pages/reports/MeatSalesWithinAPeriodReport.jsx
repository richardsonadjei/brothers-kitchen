import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';

const MeatSalesWithinAPeriodReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [summaryReport, setSummaryReport] = useState({
    totalAmount: 0,
    meatSummary: {},
    paymentSummary: {},
  });
  const [modal, setModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const fetchSalesData = () => {
    // Fetch meat sales data within the specified period
    fetch(`/api/view-meat-sales-by-period?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSalesData(data.data);
          calculateSummaryReport(data.data);
        } else {
          console.error('Error fetching meat sales data:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching meat sales data:', error);
      });
  };

  const calculateSummaryReport = (data) => {
    let totalAmount = 0;
    let meatSummary = {};
    let paymentSummary = {};

    data.forEach((sale) => {
      totalAmount += sale.totalAmount;

      // Meat summary calculation
      sale.meats.forEach((meat) => {
        const { type, quantity } = meat;
        if (!meatSummary[type]) {
          meatSummary[type] = quantity;
        } else {
          meatSummary[type] += quantity;
        }
      });

      // Payment summary calculation
      const { paymentMethod } = sale;
      if (!paymentSummary[paymentMethod]) {
        paymentSummary[paymentMethod] = sale.totalAmount;
      } else {
        paymentSummary[paymentMethod] += sale.totalAmount;
      }
    });

    setSummaryReport({
      totalAmount,
      meatSummary,
      paymentSummary,
    });
  };

  const openModal = (sale) => {
    setSelectedSale(sale);
    toggleModal();
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Meat Sales Report Within a Period</h2>

      {/* Date Input Fields */}
      <FormGroup>
        <Label for="startDate">Start Date</Label>
        <Input
          type="date"
          name="startDate"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="endDate">End Date</Label>
        <Input
          type="date"
          name="endDate"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </FormGroup>

      {/* Fetch Data Button */}
      <Button color="primary" onClick={fetchSalesData}>
        Fetch Data
      </Button>

      {/* Sales Report Table */}
      <Table striped bordered responsive className="shadow mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Meat Sales Number</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Recorded By</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={sale._id}>
              <td>{index + 1}</td>
              <td>{sale.meatSalesNumber}</td>
              <td>{sale.totalAmount}</td>
              <td>{sale.paymentMethod}</td>
              <td>{sale.recordedBy}</td>
              <td>
                <Button color="primary" onClick={() => openModal(sale)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Summary Report Table */}
      <Table bordered responsive className="shadow mt-4">
        <thead>
          <tr>
            <th colSpan="2">Summary Report</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Amount</td>
            <td>{summaryReport.totalAmount}</td>
          </tr>
          <tr>
            <td>Meat Summary</td>
            <td>
              <Table>
                <thead>
                  <tr>
                    <th>Meat Name</th>
                    <th>Total Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summaryReport.meatSummary).map(([meat, quantity]) => (
                    <tr key={meat}>
                      <td>{meat}</td>
                      <td>{quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>
          <tr>
            <td>Payment Method Summary</td>
            <td>
              <Table>
                <thead>
                  <tr>
                    <th>Payment Method</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summaryReport.paymentSummary).map(([method, amount]) => (
                    <tr key={method}>
                      <td>{method}</td>
                      <td>{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Modal for Viewing Sale Details */}
      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Meat Sales Details</ModalHeader>
        <ModalBody>
          {/* Render the details of the selected sale in a table */}
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Meat Type</th>
                <th>Quantity</th>
                <th>Price Per Unit</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedSale?.meats.map((meat, index) => (
                <tr key={index}>
                  <td>{meat.type}</td>
                  <td>{meat.quantity}</td>
                  <td>{meat.pricePerUnit}</td>
                  <td>{meat.subTotal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default MeatSalesWithinAPeriodReport;
