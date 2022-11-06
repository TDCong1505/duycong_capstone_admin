import React from 'react';

export default function EducationCard({ shortName, name, degree, major, startDate, endDate, otherDesc }) {
  const startDateCv = new Date(startDate * 1000).toLocaleDateString();
  const endDateCv = new Date(endDate * 1000).toLocaleDateString();
  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        marginTop: "20px",
        borderRadius: '25px',
        border: "1px solid #ececec",
        fontSize: "16px"
      }}>
      <div style={{ padding: '5px' }}>
        Tên trường: {shortName}-{name}
      </div>
      <div style={{ padding: '5px' }}>
        Ngành học: {major} &nbsp; Bằng cấp: {degree}
      </div>
      <div style={{ padding: '5px' }}>
        Thời gian: {startDateCv} - {endDateCv}
      </div>
      <div style={{ padding: '5px' }}>Ghi chú: {otherDesc}</div>
    </div>
  );
}
