import React from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { createBrowserHistory } from 'history';

export default function ButtonGoBack() {
  return (
    <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', width: "80px" }} onClick={createBrowserHistory().goBack}>
      <IoChevronBackOutline size={20} /> <div style={{ fontSize: '16px' }}>Quay lại</div>
    </div>
  );
}
