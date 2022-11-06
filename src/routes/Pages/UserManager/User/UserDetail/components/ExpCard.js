import React from 'react';
import { useSelector } from 'react-redux';

export default function ExpCard({ categoryId, experienceId, note }) {
  const categoryInit = useSelector(state => state.initData.initData.FjobCategory);
  const timeExperience = useSelector(state => state.initData.initData.FjobExperience);
  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        marginTop: "20px",
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: "16px",
        border: "1px solid #ececec",
      }}>
      <div style={{ display: 'flex', padding: '5px' }}>
        Kỹ năng:&nbsp;
        {categoryInit.map(item => {
          if (item.id === categoryId) {
            return <div key={item.id}>{item.name}</div>;
          }
        })}
      </div>
      <div style={{ display: 'flex', padding: '5px' }}>
        Thời gian:&nbsp;
        {timeExperience.map(item => {
          if (item.id === experienceId) {
            return <div key={item.id}>{item.name}</div>;
          }
        })}
      </div>
      <div style={{ padding: '5px' }}>Ghi chú: &nbsp; {note}</div>
    </div>
  );
}
