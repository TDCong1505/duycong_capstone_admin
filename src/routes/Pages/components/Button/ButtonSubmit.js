import React from 'react';

export default function ButtonSubmit({ title, width, onClick }) {
  return (
    <button
      style={{
        width: width,
        height: '44px',
        backgroundColor: '#8218D1',
        border: 'none',
        color: '#FFF',
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
