import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';

const BulkMeatIssueReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [issuesData, setIssuesData] = useState([]);
  const [summaryReport, setSummaryReport] = useState({
    totalAmount: 0,
    meatSummary: {},
  });
  const [modal, setModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [incomeVariationForm, setIncomeVariationForm] = useState({
    expectedSalesAmount: 0,
    meatIssueNumber: '',
    actualSalesAmount: '',
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleIncomeVariationInputChange = (event) => {
    const { name, value } = event.target;
    setIncomeVariationForm({
      ...incomeVariationForm,
      [name]: value,
    });
  };

  const fetchIssuesData = () => {
    // Fetch bulk meat issue data within the specified period
    fetch(`/api/get-bulk-meat-issues-in-period?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setIssuesData(data);
          calculateSummaryReport(data);
        } else {
          console.error('Error fetching meat issues data:', data ? data.error : 'Unknown error');
        }
      })
      .catch((error) => {
        console.error('Error fetching meat issues data:', error);
      });
  };

  const calculateSummaryReport = (data) => {
    let totalAmount = 0;
    let meatSummary = {};

    data.forEach((issue) => {
      totalAmount += issue.totalAmount;

      // Meat summary calculation
      issue.meats.forEach((meat) => {
        const { type, quantity } = meat;
        if (!meatSummary[type]) {
          meatSummary[type] = quantity;
        } else {
          meatSummary[type] += quantity;
        }
      });
    });

    setSummaryReport({
      totalAmount,
      meatSummary,
    });
  };

  const openModal = (issue) => {
    setSelectedIssue(issue);
    toggleModal();
  };

  const openIncomeVariationFormModal = (issue) => {
    const { totalAmount, meatIssueNumber } = issue || {};
    setIncomeVariationForm({
      expectedSalesAmount: totalAmount,
      meatIssueNumber,
      actualSalesAmount: '',
    });
    toggleModal();
  };

  const saveIncomeVariation = () => {
    // Implement the logic to save income variation data
    // You can make a fetch request to your server to handle the saving of income variation data
    fetch('/api/save-income-variation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incomeVariationForm),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data as needed
        console.log('Saved Income Variation Data:', data);

        // Close the modal after saving
        toggleModal();
      })
      .catch((error) => {
        console.error('Error saving income variation data:', error);
      });
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Bulk Meat Issue Report Within a Period</h2>

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
      <Button color="primary" onClick={fetchIssuesData}>
        Fetch Data
      </Button>

      {/* Issues Report Table */}
      <Table striped bordered responsive className="shadow mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Meat Issue Number</th>
            <th>Expected Total Amount</th>
            <th>Recorded By</th>
            <th>Details</th>
            <th>Income Variation</th>
          </tr>
        </thead>
        <tbody>
          {issuesData.map((issue, index) => (
            <tr key={issue._id}>
              <td>{index + 1}</td>
              <td>{issue.meatIssueNumber}</td>
              <td>{issue.totalAmount}</td>
              <td>{issue.recordedBy}</td>
              <td>
                <Button color="primary" onClick={() => openModal(issue)}>
                  View Details
                </Button>
              </td>
              <td>
                <Button color="info" onClick={() => openIncomeVariationFormModal(issue)}>
                  Add Income Variation
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
        </tbody>
      </Table>

      {/* Modal for Viewing Issue Details */}
      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Bulk Meat Issue Details</ModalHeader>
        <ModalBody>
          {/* Render the details of the selected issue in a table */}
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
              {selectedIssue?.meats.map((meat, index) => (
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

      {/* Modal for Income Variation Form */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Income Variation Form</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="expectedSalesAmount">Expected Sales Amount</Label>
            <Input
              type="number"
              name="expectedSalesAmount"
              id="expectedSalesAmount"
              value={incomeVariationForm.expectedSalesAmount}
              onChange={handleIncomeVariationInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="meatIssueNumber">Meat Issue Number</Label>
            <Input
              type="text"
              name="meatIssueNumber"
              id="meatIssueNumber"
              value={incomeVariationForm.meatIssueNumber}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="actualSalesAmount">Actual Sales Amount</Label>
            <Input
              type="number"
              name="actualSalesAmount"
              id="actualSalesAmount"
              value={incomeVariationForm.actualSalesAmount}
              onChange={handleIncomeVariationInputChange}
            />
          </FormGroup>
          <Button color="primary" onClick={saveIncomeVariation}>
            Save Income Variation
          </Button>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default BulkMeatIssueReport;
