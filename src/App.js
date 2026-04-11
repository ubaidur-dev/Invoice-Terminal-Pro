import React, { useState, useEffect } from 'react';
import './App.css';
import InvoiceTable from './components/InvoiceTable';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', qty: 1, price: 0, discount: 0 });
  const [customer, setCustomer] = useState({ name: '', address: '', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const updatedData = data.map(item => ({ ...item, discount: item.discount || 0 }));
        setItems(updatedData);
      })
      .catch(() => console.log("Starting with empty list"));
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || newItem.price <= 0) return;
    
    const itemTotal = (newItem.qty * newItem.price) - Number(newItem.discount);
    
    const itemToAdd = {
      ...newItem,
      id: Date.now(),
      total: itemTotal > 0 ? itemTotal : 0 
    };
    
    setItems([itemToAdd, ...items]);
    setNewItem({ name: '', qty: 1, price: 0, discount: 0 }); 
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const grandTotal = items.reduce((acc, item) => acc + (item.qty * item.price - (item.discount || 0)), 0);
  const totalSavings = items.reduce((acc, item) => acc + Number(item.discount || 0), 0);

  return (
    <div className="dashboard-wrapper">
      <div className="invoice-container">
        
        <div className="brand-logo">
  <div className="logo-icon-box">
    <img 
      src="logo.png" 
      alt="Ubaid Ur Rehman" 
      style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} 
    />
  </div>
  <div>
    <h2 className="brand-name">UBAIDUR.DEV SOLUTIONS</h2>
    <p className="brand-tagline">Premium Frontend Development & Repair</p>
  </div>
</div>
        <h1 className="main-title">INVOICE.</h1>
        
        <div className="glass-card info-grid">
          <div className="input-group">
            <label>CUSTOMER NAME</label>
            <input type="text" placeholder="e.g. Ali Khan" onChange={(e) => setCustomer({...customer, name: e.target.value})} />
          </div>
          <div className="input-group">
            <label>BUSINESS ADDRESS</label>
            <input type="text" placeholder="City, Country" onChange={(e) => setCustomer({...customer, address: e.target.value})} />
          </div>
          <div className="input-group">
            <label>BILLING DATE</label>
            <input type="date" value={customer.date} onChange={(e) => setCustomer({...customer, date: e.target.value})} />
          </div>
        </div>

        <form className="glass-card add-item-form" onSubmit={handleAddItem}>
          <input 
            type="text" placeholder="Item Description" value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})} required
          />
          <input 
            type="number" placeholder="Qty" value={newItem.qty}
            onChange={(e) => setNewItem({...newItem, qty: e.target.value})}
          />
          <input 
            type="number" placeholder="Price ($)" value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
          />
          <input 
            type="number" placeholder="Discount ($)" value={newItem.discount}
            onChange={(e) => setNewItem({...newItem, discount: e.target.value})}
          />
          <button type="submit" className="btn-add">Add Item</button>
        </form>

        <InvoiceTable items={items} onRemove={removeItem} total={grandTotal} savings={totalSavings} />

        <div className="invoice-footer">
          <div className="footer-info">
            <p> This is a system-generated document and does not require a physical signature.</p>
            <p className="support-link">ubaidur.dev@gmail.com</p>
          </div>
          <button className="btn-print-v2" onClick={() => window.print()}>
            <i className="fa fa-print" style={{marginRight: '8px'}}></i> Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;