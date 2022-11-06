import React from 'react';

export default function ButtonChange({ title, width, onClick }) {
  return (
    <button
      type="reset"
      style={{
        width: width,
        height: '44px',
        backgroundColor: '#FFF',
        color: '#FF8500',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        marginRight: '20px',
        border: "none"
      }}
      onClick={onClick}>
      {title}
    </button>
  );
}