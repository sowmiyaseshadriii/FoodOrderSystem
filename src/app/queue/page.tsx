"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/style.css';

const QueuePage = ({ preparationQueue }: any) => {
  const [isMounted, setIsMounted] = useState(false);   
  const [preparingQueue, setPreparingQueue] = useState([]);
  const [collectionQueue, setCollectionQueue] = useState(null);
  const [showBanner, setShowBanner] = useState<string|null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchQueueNumbers();
    }
  }, [isMounted]); 

  useEffect(() => {
    // Hide the success banner after 3 seconds
    if (showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showBanner]);

  const fetchQueueNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/queue-numbers');
      console.log(response);
      const { preparing, collection } = response.data;
      setPreparingQueue(preparing);
      setCollectionQueue(collection);
    } catch (error) {
      console.error('Error fetching queue numbers:', error);
    }
  };

  const handleRefresh = () => {
    fetchQueueNumbers();
  };

  const moveOrderToCollection = () => {
    if (preparingQueue.length === 0) {
      setShowBanner('No orders in preparation.');
      return;
    }
    const nextOrder = preparingQueue[0];
    setCollectionQueue(nextOrder);
    setPreparingQueue([]);
    updateOrderStatus(nextOrder, 'Collection');
  };

  const updateOrderStatus = (orderNumber: number, status: string) => {
    console.log(`Order ${orderNumber} moved to ${status}.`);
  };

  return (
    <>
      <h2 className="text-2xl text-center m-2">Current Queue Status</h2>
      <div className="queue-container">
        {showBanner && (
          <div style={{ backgroundColor: "darkslategrey", color: 'white', margin: '10px', padding: '10px' }}>
            No orders in preparation, Place an Order !!!
          </div>
        )}
        <div className="sections">
          <div className="section">
            <h3 className="section-title">Preparing</h3>
            <ul className="queue-list">
              {preparingQueue.map((number) => (
                <li key={number} className="queue-item">Queue Number: {number}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3 className="section-title">Collection</h3>
            <ul className="queue-list">
             {collectionQueue !== null ? 
              <li key={collectionQueue} className="queue-item">Queue Number: {collectionQueue}</li> : <></>
             }
            </ul>
          </div>
        </div>
        <div className="refresh-btn-container">
          <button className="ordercollection-btn mr-2"  onClick={moveOrderToCollection}>Move Next Order to Collection</button>
          <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
        </div>      
      </div>
      <div className='mb-2'>  
        <p className="text-center text-600 mt-4">Thank you for checking the queue! Feel free to visit again.</p>
      </div>
    </>
  );
};

export default QueuePage;
