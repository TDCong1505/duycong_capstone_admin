import React from 'react';

export default function ButtonReset({ title, width, onClick }) {
  return (
    <button
      type="reset"
      style={{
        width: width,
        height: '44px',
        backgroundColor: '#FFF',
        border: '1px solid #6E00C2',
        color: '#6E00C2',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        marginRight: '20px',
      }}
      onClick={onClick}>
      {title}
    </button>
  );
}
