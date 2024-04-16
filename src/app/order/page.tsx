"use client"
import { useState, useEffect } from "react";
import menuList from '../menuList.json';
import '../../styles/style.css';
import axios from 'axios';

const OrderPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<any>({});
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [queueNumber, setQueueNumber] = useState(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  // Handler for submitting the form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Validate the form fields
      if (
        selectedItems.length !== 2 || 
        Object.keys(quantities).length !== selectedItems.length ||
        !declarationChecked ||
        Object.values(quantities).some((quantity) => quantity === '' || quantity === undefined) ||
        selectedItems.some((item) => item === '' || item === undefined)
      ) {
        setShowErrorBanner(true);
        setError('Please select upto 2 items, fill in the quantities and accept the declaration.');
        return;
      }
      
      // Submit the form data
      const formData = {
        items: selectedItems.map((item, index) => ({ itemName: item, quantity: quantities[index] })),
        checkboxDeclare: declarationChecked
      };
     
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:8080/order', formData);
      setQueueNumber(response.data.queueNum);
      setShowSuccessBanner(true);
      setError(null);
      setShowErrorBanner(false);
      // Reset form fields
      setSelectedItems([]);
      setQuantities({});
      setDeclarationChecked(false);
    } catch(error) {
      console.error('Error placing order:', error);
      setError('Error placing order. Please try again.');
    }
  };

  // Handler for selecting an item
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = e.target.value;
    if (selectedItems.length >= 2) {
      setShowErrorBanner(true);
      setError('You can only select up to 2 items.');
      return;
    }  
    setShowErrorBanner(false);
    setSelectedItems([...selectedItems, selectedItem]);
    setQuantities({ ...quantities, [selectedItems.length]: '' });
  };

  // Handler for updating quantity
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedQuantities = { ...quantities, [index]: e.target.value };
    setQuantities(updatedQuantities);
  };

  // Handler for deleting an item
  const handleDeleteItem = (index: number) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  
    // Also remove the corresponding quantity from quantities state
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[index];
    setQuantities(updatedQuantities);
  };

  useEffect(() => {
    // Hide the success banner after 3 seconds
    if (showSuccessBanner) {
      const timer = setTimeout(() => {
        setShowSuccessBanner(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    // Hide the error banner after 3 seconds
    if (showErrorBanner) {
      const timer = setTimeout(() => {
        setShowErrorBanner(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessBanner, showErrorBanner]);

  return (
    <>
      <h2 className="text-2xl text-center m-2">Place Your Order</h2>
      <div className="form-container">
        {showSuccessBanner && (
          <div style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
            Order placed successfully. Queue number: {queueNumber}
          </div>
        )}
        {showErrorBanner && (
          <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="itemName" className="font-semibold">Item List:</label>
            <select
              id="itemName"
              value=""
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select an item</option>
              {menuList.flatMap((category) =>
                category.items.map((item) => (
                  <option key={item.value} value={item.name}>
                    {item.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {selectedItems.map((selectedItem, index) => (
            <div key={index} className="form-group">
              <label htmlFor={`quantity-${index}`}>{selectedItem} - Quantity:</label>
              <input
                type="number"
                id={`quantity-${index}`}
                value={quantities[index] || ''}
                onChange={(e) => handleQuantityChange(e, index)}
                min="1"
                max="5"
              />
              <button type="button" className="delete-btn mt-2" onClick={() => handleDeleteItem(index)}>Delete</button>
            </div>
          ))}
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={declarationChecked}
                onChange={(e) => setDeclarationChecked(e.target.checked)}
              />
              I agree I have no food allergy.
            </label>
          </div>
          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
        <h6 className="text-sm text-center mt-6 italic" >Note: If all Order placed, go to Queue</h6>
      </div>
    </>
  );
};

export default OrderPage;
