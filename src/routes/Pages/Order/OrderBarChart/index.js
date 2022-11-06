import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStyles } from 'Configuration/function';
import styles from '../../Product/New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, Paper } from '@material-ui/core';
import { Row } from 'antd';
import OrderService from 'services/auth/OrderService';
import { DatePicker, Space } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { date } from 'yup/lib/locale';

const heading = 'Thống kê đơn hàng';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Thông kế doanh thu',
    },
  },
};
export default function OrderBarChart() {
  const classes = useStyles();
  const [ orders , setOrders ] = useState([]);
  const loadOrders = async () => {
    let res = await OrderService.getAll();
    setOrders(res.data);
  }
  useEffect(() => {
    loadOrders();
  },[]);
  const { RangePicker } = DatePicker;
  const labels = ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Số đơn hàng',
        data: labels.map((data) => {
          let sumOrders = 0;
          orders.map((info) => {
            const month = "Tháng ".concat(info.shippedDate.slice(5,7));
            if(data == month){
              sumOrders += 1;
            }
          })
          return sumOrders;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Tổng tiền (trăm triệu VNĐ)',
        data: labels.map((data) => {
        let sumPrice = 0;
          orders.map((info) => {
            const month = "Tháng ".concat(info.shippedDate.slice(5,7));        
            if(data == month){
              let details = info.orderDetails;
              {details.map((detail) => {
                sumPrice += (detail.priceEach * detail.quantityOrder)/100000000;
              })}
            }
          })
          return sumPrice;
        }
        ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const handleChangeDate = async (dates, dateStrings) => {
    let res = await OrderService.getByTime(dateStrings[0],dateStrings[1]);
    setOrders(res.data);
    console.log(res.data);
  }
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>THỐNG KÊ ĐƠN HÀNG</div>
            <RangePicker onChange={handleChangeDate} style={{width:'30%'}}/>
            <Row justify="space-between">
            <Bar options={options} data={data} />
            </Row>
          </div>
        </Paper>
      </Box>
    </PageContainer>
  );
}
