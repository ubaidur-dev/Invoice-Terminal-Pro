import React from 'react';

const InvoiceTable = ({ items, onRemove, total, savings }) => {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>DESCRIPTION</th>
            <th>QTY</th>
            <th>UNIT PRICE</th>
            <th>DISCOUNT</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="item-row">
              <td style={{fontWeight: '500'}}>
                {item.name}
                {item.qty >= 10 && <span className="bulk-badge">BULK</span>}
              </td>
              <td>{item.qty}</td>
              <td>${Number(item.price).toLocaleString()}</td>
              <td style={{color: '#f43f5e'}}>- ${Number(item.discount || 0).toLocaleString()}</td>
              <td style={{fontWeight: '600'}}>${(item.qty * item.price - (item.discount || 0)).toLocaleString()}</td>
              <td style={{textAlign: 'right'}}>
                <button className="remove-link" onClick={() => onRemove(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="summary-section">
        <div className="savings-tag">You saved a total of ${savings.toLocaleString()} today!</div>
        <div className="total-display">
          Total Amount Due: <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;