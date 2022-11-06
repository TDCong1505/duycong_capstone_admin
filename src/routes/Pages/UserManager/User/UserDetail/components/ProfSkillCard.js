import React from 'react';
import { useSelector } from 'react-redux';

export default function ProfSkillCard({ profSkillId, experience, note }) {
  const skillInit = useSelector(state => state.initData.initData.FjobProfSkill);
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
        {skillInit.map(item => {
          if (item.id === profSkillId) {
            return <div key={item.id}>{item.name}</div>;
          }
        })}
      </div>
      <div style={{ display: 'flex', padding: '5px' }}>
        Thời gian:&nbsp;
        {timeExperience.map(item => {
          if (item.id === experience) {
            return <div key={item.id}>{item.name}</div>;
          }
        })}
      </div>
      <div style={{ padding: '5px' }}>Mô tả chi tiết:&nbsp;{note}</div>
    </div>
  );
}
