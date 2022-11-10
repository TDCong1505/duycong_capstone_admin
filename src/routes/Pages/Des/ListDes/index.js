import React, { useEffect } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover, Image } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { rootPath } from 'helpers/buildUrl';
import ProductService from 'services/auth/ProductService';
import ProductPhotoService from 'services/auth/ProductPhotoService';
import ProductDesService from 'services/auth/ProductDesService';

const heading = 'sidebar.descDetail';
const columns = [
  {
    title: '',
    dataIndex: '',
    key: 'action',
    render: (text, record) => {
      return (
      <Space size="middle">
        <Popover
          content={
            <div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listDes}/show/${record.id.props.children}`}>Xem thông số sản phẩm</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listDes}/edit/${record.id.props.children}`}>Chỉnh sửa thông số sản phẩm</Link>
              </div>
            </div>
          }
          trigger="click">
          <Button
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ececec' }}
            type="primary"
            danger
            icon={<BsThreeDots />}></Button>
        </Popover>
      </Space>
    )}
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title:'Độ phân giải màn hình',
    dataIndex:'pixels',
  },
  {
    title:'Kích thước màn hình',
    dataIndex:'inches',
  },
  {
    title:'Bộ nhớ trong',
    dataIndex:'memory'
  },
  {
    title:'Chip',
    dataIndex:'chipset',
  },
  {
    title:'Trọng lượng',
    dataIndex:'weight',
  },
  {
    title:'Màn hình',
    dataIndex:'screen',
  },
  {
    title:'Quay video',
    dataIndex:'video',
  },
  {
    title:'Kích thước',
    dataIndex:'size'
  },
  {
    title:'Pin',
    dataIndex:'pin'
  },
  {
    title:'Camera trước',
    dataIndex:'camera1',
  },
  {
    title:'Camera sau',
    dataIndex:'camera2',
  },
  // {
  //   title:'Sim',
  //   dataIndex:'sim'
  // },
  // {
  //   title:'WLAN',
  //   dataIndex:'wlan'
  // },
  // {
  //   title:'Bluetooth',
  //   dataIndex:'bluetooth',
  // },
  // {
  //   title:'Cảm biến',
  //   dataIndex:'sensor',
  // },
  // {
  //   title:'GPS',
  //   dataIndex:'gps'
  // }
];

export default function ListPhoto() {

  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res =  await ProductDesService.getAllPageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listDes}/new`;
  const pathFilter = null;
  const classes = useStyles();

  const handleCallBack = (Lists, total) => {
    setList(Lists);
    setTotal(total);
  };

  const rows = [];
  const handleChangePage = newPage => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    loadList();
  },[currentPage])
  list.forEach(item => {
    const JobDetailCpn = ({ children }) => (
      <Link style={{ color: 'black' }} to={`${rootPath.listDes}/show/${item.id}`}>
        {children}
      </Link>
    )
    rows.push({
      key: item.code,
      id: <p>{item.id}</p>,
      inches:<JobDetailCpn children={item.inches} />,
      pixels:<JobDetailCpn children={item.pixels} />,
      memory:<JobDetailCpn children={item.memory} />,
      chipset:<JobDetailCpn children={item.chipset} />,
      weight:<JobDetailCpn children={item.weight} />,
      screen:<JobDetailCpn children={item.screen} />,
      video:<JobDetailCpn children={item.video} />,
      size:<JobDetailCpn children={item.size} />,
      pin:<JobDetailCpn children={item.pin} />,
      camera1:<JobDetailCpn children={item.camera1} />,
      camera2:<JobDetailCpn children={item.camera2} />,
      sim:<JobDetailCpn children={item.sim} />,
      wlan:<JobDetailCpn children={item.wlan} />,
      bluetooth:<JobDetailCpn children={item.bluetooth} />,
      gps:<JobDetailCpn children={item.gps} />,
      sensor:<JobDetailCpn children={item.sensor} />,
    })
  });

  const styleTable = rows.length > 0 ? { width: '1600px' } : { width: '1600px' };

  return (
    <TableLayout
      handleCallBack={handleCallBack}
      heading={heading}
      currentPage={currentPage}
      rows={rows}
      total={total}
      handleChangePage={handleChangePage}
      showDrawer={showDrawer}
      pathFilter={pathFilter}
      pathCreate={pathCreate}>
      <Box style={styleTable} className={classes.root}>
        <Paper className={classes.paper}>
          <Table style={{ borderRadius: "10px" }} columns={columns} dataSource={rows} pagination={false} />
        </Paper>
      </Box>
    </TableLayout>
  );
}
