import React from 'react';

export default function ButtonDelete({ title, width, onClick }) {
  return (
    <button
      style={{
        width: width,
        height: '44px',
        backgroundColor: '#FFF',
        border: 'none',
        color: '#FF0000',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
      onClick={onClick}>
      {title}
    </button>
  );
}
