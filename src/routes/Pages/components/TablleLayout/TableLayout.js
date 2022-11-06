import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Link } from 'react-router-dom';
import Pagination from 'routes/Pages/components/Pagination/Pagination';
import ButtonSubmit from '../Button/ButtonSubmit';
import ButtonReset from '../Button/ButtonReset';
import styles from './Table.module.scss';
import { Input } from 'antd';
const { Search } = Input;

export default function TableLayout({
  heading,
  breadcrumbs,
  currentPage,
  total,
  handleChangePage,
  showDrawer,
  pathCreate,
  pathFilter,
  children,
  pathSearch,
  onSearch,
  valueSearch,
  pathSearchCompany
}) {
  return (
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
          {pathCreate && (
            <Link style={{ color: 'white' }} to={pathCreate}>
              <ButtonSubmit title="Tạo mới" width="120px" />
            </Link>
          )}
          {pathFilter !== null && <ButtonReset title="Tìm kiếm" width="120px" onClick={showDrawer} />}
        </div>

        <div className={styles.table}>
          <div>{children}</div>
          <Pagination currentPage={currentPage} total={total} handleChangePage={handleChangePage} />
        </div>
      </div>
    </PageContainer>
  );
}
