import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import { CONFIGURATION } from 'Configuration';

export default function Pagination({ currentPage, total, handleChangePage, pageSize = CONFIGURATION.page.limit }) {
  return (
    <AntdPagination style={{marginBottom: "20px"}} current={currentPage} total={total} pageSize={pageSize} onChange={page => handleChangePage(page)} />
  );
}
