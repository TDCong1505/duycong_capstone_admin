import React from 'react';
import { convertPriceUnit } from 'Configuration';

export default function ServiceCard({ serviceCode, serviceName, quantity, priceUnit }) {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        marginTop: "20px",
        borderRadius: '25px',
        border: "1px solid #ececec",
        fontSize: "16px",
        // display: 'flex',
        // flexDirection: co
      }}>
      <div style={{ padding: '5px', display: "flex" }}>Mã: &nbsp; <div style={{ color: "#6E00C2" }}>{serviceCode}</div></div>
      <div style={{ padding: '5px', display: "flex" }}>Tên: &nbsp; <div style={{ color: "#6E00C2" }}>{serviceName}</div></div>
      <div style={{ padding: '5px', display: "flex" }}>
        Số lượng: &nbsp; <div style={{ color: "#6E00C2" }}>{quantity}</div>&emsp; Đơn Vị: &nbsp; <div style={{ color: "#6E00C2" }}>{convertPriceUnit(priceUnit)}</div>
      </div>
    </div>
  );
}
