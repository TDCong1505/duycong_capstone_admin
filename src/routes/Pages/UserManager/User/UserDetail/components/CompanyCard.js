import React from 'react';
import { convertRoleCompany } from 'Configuration';

export default function CompanyCard({ companyAvatar, companyName, companyContactPhone, companyWebsite, ucUserRole }) {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        marginTop: "20px",
        borderRadius: '25px',
        display: 'flex',
        // flexDirection: 'column',
        fontSize: "16px",
        border: "1px solid #ececec",
      }}>
      <div style={{ marginRight: '20px', display: "flex", alignItems: "center" }}>
        {companyAvatar ? (
          <img style={{ width: '100px', height: '100px' }} src={companyAvatar} alt="" />
        ) : (
          <img
            style={{ borderRadius: '99em', width: '100px', height: '100px' }}
              src="https://storage.googleapis.com/fjob-dev/bcedc860-5ffc-11ec-a2ed-8945ee31ff60.png"
              alt=''
          />
        )}
      </div>

      <div>
        <div style={{ padding: '3px', fontWeight: "bold" }}>{companyName}</div>
        <div>
          <div style={{ padding: '3px' }}>Phone: {companyContactPhone}</div>
          <div style={{ padding: '3px' }}>Website: {companyWebsite}</div>
        </div>
        <div style={{ padding: '3px' }}>Vai trò: {convertRoleCompany(ucUserRole)}</div>
      </div>
    </div>
  );
}
