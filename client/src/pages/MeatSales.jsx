import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const RecordMeatSales = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [salesDate, setSalesDate] = useState(new Date().toISOString().substr(0, 10)); 
  const [sales, setSales] = useState([]);
  const [meatTypeOptions, setMeatTypeOptions] = useState([]);
  const [selectedMeatType, setSelectedMeatType] = useState(null);
  const [modalData, setModalData] = useState(null); // For modal display
  const [overallTotal, setOverallTotal] = useState(0); // Overall total for the transaction

  useEffect(() => {
    fetchMeatTypes();
  }, []);

  const fetchMeatTypes = async () => {
    try {
      const response = await fetch('/api/all-meat-types');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const options = data.map((meatType) => ({
        value: meatType._id,
        label: meatType.name,
      }));
      setMeatTypeOptions(options);
    } catch (error) {
      console.error('Error fetching meat types:', error);
    }
  };

  const handleAddItem = () => {
    if (selectedMeatType) {
      const newItem = {
        materialName: selectedMeatType.label,
        unitPrice: 0,
        quantity: 0,
        subtotal: 0 // Initialize subtotal for each item
      };
      setSales([...sales, newItem]);
      setSelectedMeatType(null);
    }
  };

  const handleSaleChange = (index, field, value) => {
    const updatedSales = [...sales];
    updatedSales[index][field] = value;
    
    // Ensure both unit price and quantity are numbers before calculating subtotal
    if (!isNaN(updatedSales[index].unitPrice) && !isNaN(updatedSales[index].quantity)) {
      updatedSales[index].subtotal = updatedSales[index].unitPrice * updatedSales[index].quantity; // Update subtotal when unit price or quantity changes
    } else {
      updatedSales[index].subtotal = 0; // Set subtotal to 0 if either unit price or quantity is not a number
    }
    
    setSales(updatedSales);
    
    // Update overall total by summing the subtotals of all items
    const newOverallTotal = updatedSales.reduce((total, item) => total + item.subtotal, 0);
    setOverallTotal(newOverallTotal);
  };
  

  const handleRemoveItem = (index) => {
    const updatedSales = [...sales];
    updatedSales.splice(index, 1);
    setSales(updatedSales);
    
    // Update overall total by recalculating the sum of subtotals
    const newOverallTotal = updatedSales.reduce((total, item) => total + item.subtotal, 0);
    setOverallTotal(newOverallTotal);
  };

  const handleSubmit = async () => {
    try {
      // Calculate overall total before sending data to the backend
      const newOverallTotal = sales.reduce((total, item) => total + item.subtotal, 0);

      const response = await fetch('/api/add-meat-sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sales,
          salesDate,
          recordedBy: currentUser.userName 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Show success message
      alert('Meat sales recorded successfully');
  
      // Clear the form
      setSales([]);
      setSalesDate(new Date());
      setSelectedMeatType(null);

      // Display modal with recorded data
      const responseData = await response.json();
      setModalData(responseData);
    } catch (error) {
      // Handle errors and show an error message
      console.error('Error recording meat sales:', error);
      alert('Error recording meat sales');
    }
  };

  const closeModal = () => {
    setModalData(null); // Close modal by resetting modalData
    setOverallTotal(0);
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Inside your component:
  <p>Sales Date: {getFormattedDate(modalData?.salesDate)}</p>
  
  return (
    <Container>
      <h2>Record Meat Sales</h2>
      <Row>
          <Col md={12}>
          <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'red' }}>Total Amount: {overallTotal}</p>
          </Col>
        </Row>
      <Form>
        <Row>
          <Col md={12}>
            <Select
              value={selectedMeatType}
              onChange={(value) => setSelectedMeatType(value)}
              options={meatTypeOptions}
              placeholder="Select Meat Type"
              isClearable
              isSearchable
            />
            <Button color="primary" onClick={handleAddItem} disabled={!selectedMeatType}>
              Add Item
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Meat Type</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th> {/* New column for displaying subtotal */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((item, index) => (
                  <tr key={index}>
                    <td>{item.materialName}</td>
                    <td>
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleSaleChange(index, 'unitPrice', parseFloat(e.target.value))}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleSaleChange(index, 'quantity', parseInt(e.target.value))}
                      />
                    </td>
                    <td>{item.subtotal}</td> {/* Display subtotal */}
                    <td>
                      <Button color="danger" onClick={() => handleRemoveItem(index)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="salesDate">Sales Date</Label>
              <Input
                type="date"
                name="salesDate"
                id="salesDate"
                value={salesDate}
                onChange={(e) => setSalesDate(e.target.value)}
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
                value={currentUser ? currentUser.userName : ''}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>

        

        <Button color="success" onClick={handleSubmit}>
          Record Sales
        </Button>
      </Form>

      {/* Modal for Recorded Data */}
      <Modal isOpen={modalData !== null} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Meat Sales Recorded Successfully</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Meat Type</th>
                <th>Unit Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {modalData?.sales?.map((item, index) => (
                <tr key={index}>
                  <td>{item.materialName}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total Amount: {modalData?.grandTotal}</p>
          <p>Sales Date: {getFormattedDate(modalData?.salesDate)}</p>
          <p>Recorded By: {modalData?.recordedBy}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default RecordMeatSales;
