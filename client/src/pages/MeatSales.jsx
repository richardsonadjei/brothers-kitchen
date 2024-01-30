// MeatSales.jsx
import React, { useState } from 'react';
import Select from 'react-select';

const meatTypeValues = [
  { value: 'Intestines', label: 'Intestines' },
  { value: 'Legs', label: 'Legs' },
  { value: 'Liver', label: 'Liver' },
  { value: 'Head', label: 'Head' },
];

const MeatSales = () => {
  const [meatSales, setMeatSales] = useState([]);
  const [recordedBy, setRecordedBy] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [modalData, setModalData] = useState(null);
  const [selectedMeat, setSelectedMeat] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity to 1

  const handleMeatChange = () => {
    if (selectedMeat) {
      const pricePerUnit = getPricePerUnit(selectedMeat.value);
      const subtotal = pricePerUnit * quantity;

      setMeatSales([...meatSales, { meatType: selectedMeat.label, quantity, pricePerUnit, subTotal: subtotal }]);
      setSelectedMeat(null);
      setQuantity(1); // Reset quantity to default after adding meat
    }
  };

  const handleRemoveMeat = (index) => {
    const updatedMeatSales = [...meatSales];
    updatedMeatSales.splice(index, 1);
    setMeatSales(updatedMeatSales);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/add-meat-sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sales: meatSales,
          recordedBy,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error recording meat sale: ${response.statusText}`);
      }

      const responseData = await response.json();
      setModalData(responseData.data);
      // You can handle modal visibility here (e.g., show modal)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const getPricePerUnit = (meatType) => {
    switch (meatType) {
      case 'Intestines':
        return 10;
      case 'Legs':
        return 5;
      case 'Liver':
        return 10;
      case 'Head':
        return 10;
      // Add more cases for other meat types if needed
      default:
        return 0; // Default price for unknown types
    }
  };
  const resetState = () => {
    setMeatSales([]);
    setRecordedBy('');
    setPaymentMethod('cash');
    setSelectedMeat(null);
    setQuantity(1);
  };
  const handleCloseModal = () => {
    resetState();
    setModalData(null);
    window.location.reload(); // Reload the page
  };

  return (
    <div className="meat-sales-container" style={{ backgroundImage: 'url("/orphiles.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <h1>Record Meat Sale</h1>
      <form style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px' }}>
      <label htmlFor="meatType" style={{ fontWeight: 'bold', fontSize: '16px' }}>Meat Type:</label>
        <Select
          id="meatType"
          options={meatTypeValues}
          value={selectedMeat}
          onChange={(value) => setSelectedMeat(value)}
          isSearchable
        />
        <label htmlFor="quantity" style={{ fontWeight: 'bold', fontSize: '16px' }}>Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
        <button type="button" onClick={handleMeatChange}>
          Add Meat
        </button>

        <ul>
          {meatSales.map((sale, index) => (
            <li key={index}>
              {sale.meatType} (Quantity: {sale.quantity}) - Subtotal: {sale.subTotal}
              <button type="button" onClick={() => handleRemoveMeat(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <label htmlFor="recordedBy" style={{ fontWeight: 'bold', fontSize: '16px' }}>Recorded By:</label>
        <input
          type="text"
          id="recordedBy"
          value={recordedBy}
          onChange={(e) => setRecordedBy(e.target.value)}
        />

        <label htmlFor="paymentMethod" style={{ fontWeight: 'bold', fontSize: '16px' }}>Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="momo">Momo</option>
          {/* Add other payment method options if needed */}
        </select>

        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Total Amount: {meatSales.reduce((total, sale) => total + sale.subTotal, 0)}</p>

        <button type="button" onClick={handleSubmit}>
          Record Sale
        </button>
      </form>

      {/* Modal for displaying recorded data */}
      {modalData && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Meat Sale Recorded Successfully!</h2>
            
            <table>
              <thead>
                <tr>
                  <th>Meat Type</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {modalData.meats.map((meat, index) => (
                  <tr key={index}>
                    <td>{meat.type}</td>
                    <td>{meat.quantity}</td>
                    <td>{meat.subTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>Total Amount: {modalData.totalAmount}</p>
            <p>Payment Method: {modalData.paymentMethod}</p>
            <p>Served By: {modalData.recordedBy}</p>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeatSales;
