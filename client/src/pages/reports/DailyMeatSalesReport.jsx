import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap'; 
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const AllMeatSalesTodayReport = () => {
  const [salesToday, setSalesToday] = useState([]);
  const [totalGrandTotal, setTotalGrandTotal] = useState(0);

  useEffect(() => {
    fetchSalesToday();
  }, []);

  const fetchSalesToday = async () => {
    try {
      const response = await fetch('/api/view-all-meat-sales-today');
      if (response.ok) {
        const data = await response.json();
        setSalesToday(data);
        // Calculate total grand total
        const total = data.reduce((acc, curr) => acc + curr.grandTotal, 0);
        setTotalGrandTotal(total);
      } else {
        console.error('Failed to fetch meat sales today:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching meat sales today:', error);
    }
  };

  // Function to format sales date in desired format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-3">All Meat Sales Today Report</h1>
      <h4 style={{ color: 'red', fontSize: '24px',  transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}>
  Sale For The Day: {totalGrandTotal}
</h4>

      {salesToday.map((sale) => (
        <div key={sale._id}>
          <h3>Meat Sales Number: {sale.meatSalesNumber}</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Sales Date</th>
                <th>Material Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sale.sales.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(sale.salesDate)}</td>
                  <td>{item.materialName}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.quantity}</td>
                
                  <td>{sale.recordedBy}</td>
                  <td>
                    <Button color="info" className="mr-2">
                      <AiOutlineEdit />
                    </Button>
                    <Button color="danger">
                      <AiOutlineDelete />
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="5"></td>
                <td><strong>Grand Total:</strong> {sale.grandTotal}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
    
    </div>
  );
};

export default AllMeatSalesTodayReport;
