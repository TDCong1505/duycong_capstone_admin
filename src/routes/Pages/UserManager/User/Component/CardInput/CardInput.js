import React from 'react';
import { Col } from 'antd';
import Required from 'routes/Pages/components/Element/Required';

export default function CardInput({ children, title, width, left, span, required }) {
  const w = width ? width : "378px"
  const l = left ? left : "0 20px 0 0"
  const s = span ? span : ""
  return (
    <Col style={{ width: w, margin: l }} span={s}>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
          {title}  {!required && <Required />}
        </div>
        {children}
      </div>
    </Col>
  );
}
