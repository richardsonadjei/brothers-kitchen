import React, { useState, useEffect } from 'react';
import { Table, Container } from 'reactstrap';

const ViewIncomeVariations = () => {
  const [incomeVariations, setIncomeVariations] = useState([]);

  useEffect(() => {
    // Fetch all income variations data
    fetch('/api/view-all-income-variations')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIncomeVariations(data.data);
        } else {
          console.error('Error fetching income variations data:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching income variations data:', error);
      });
  }, []);

  // Function to calculate the difference
  const calculateDifference = (expected, actual) => actual - expected;

  return (
    <Container>
      <h2 className="mt-4 mb-4">Income Variations Report</h2>

      <Table striped bordered responsive className="shadow mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Meat Issue Number</th>
            <th>Expected Sales Amount</th>
            <th>Actual Sales Amount</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {incomeVariations.map((incomeVariation, index) => (
            <tr key={incomeVariation._id}>
              <td>{index + 1}</td>
              <td>{incomeVariation.meatIssueNumber}</td>
              <td>{incomeVariation.expectedSalesAmount}</td>
              <td>{incomeVariation.actualSalesAmount}</td>
              <td style={{ color: calculateDifference(incomeVariation.expectedSalesAmount, incomeVariation.actualSalesAmount) >= 0 ? 'green' : 'red' }}>
                {calculateDifference(incomeVariation.expectedSalesAmount, incomeVariation.actualSalesAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewIncomeVariations;
