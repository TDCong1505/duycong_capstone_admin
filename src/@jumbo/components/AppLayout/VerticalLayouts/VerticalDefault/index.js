import React, { useEffect, useState } from 'react';
import './index.css'
import { Layout, Menu, message, Popover } from 'antd';
import { childPath, prefix, rootPath } from 'helpers/buildUrl';
import { BiUserCircle } from 'react-icons/bi';
import { GoReport } from 'react-icons/go';
import { IoImageOutline, IoBusinessOutline } from 'react-icons/io5';
import { MdOutlineEditNotifications } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import localStorage from 'redux-persist/es/storage';
import { setAuthUser, updateToken } from 'redux/actions/Auth';
import AuthService from 'services/auth/AuthService';
import {
  FileDoneOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const { Header, Sider, Content } = Layout;

const VerticalDefault = ({ children }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  
  const item = [
    {
      key:'productManage',
      icon:React.createElement(IoImageOutline),
      label:'Quản lý sản phẩm',
      children: [ 
        {
          key:'product',
          label:"Danh sách sản phẩm"
        }
      ]
    },
    {
      key:'customerManage',
      icon:React.createElement(IoImageOutline),
      label:'Quản lý khách hàng',
      children: [ 
        {
          key:'customer',
          label:"Danh sách khách hàng"
        },
        {
          key:'customerChart',
          label:"Thông kê khách hàng",
        }
      ]
    },
    {
      key:'productTypeManage',
      icon:React.createElement(IoImageOutline),
      label:'Quản lý loại sản phẩm',
      children: [ 
        {
          key:'producttype',
          label:"Danh sách loại sản phẩm"
        }
      ]
    },
    {
      key:'productLineManage',
      icon:React.createElement(IoImageOutline),
      label:'Quản lý hãng sản phẩm',
      children: [ 
        {
          key:'productline',
          label:"Danh sách hãng sản phẩm"
        }
      ]
    },
    {
      key:'orderManage',
      icon:React.createElement(SolutionOutlined),
      label:'Quản lý đơn hàng',
      children: [ 
        {
          key:'order',
          label:"Danh sách đơn hàng"
        },
        {
          key:'orderBar',
          label:"Thống kê đơn hàng"
        }
      ]
    },
    {
      key:'orderDetail',
      icon:React.createElement(SolutionOutlined),
      label:'Quản lý đơn hàng chi tiết',
      children: [ 
        {
          key:'orderdetail',
          label:"Danh sách đơn hàng chi tiết",
        },
      ]
    },
    {
      key:'photoManage',
      icon:React.createElement(SolutionOutlined),
      label:'Quản lý hình ảnh',
      children: [ 
        {
          key:'photo',
          label:"Danh sách hình ảnh"
        }
      ]
    },
    {
      key:'desManage',
      icon:React.createElement(SolutionOutlined),
      label:'Thông số sản phẩm',
      children: [ 
        {
          key:'des',
          label:"Thông số sản phẩm"
        }
      ]
    },
    {
      key:'voteManage',
      icon:React.createElement(SolutionOutlined),
      label:'Quản lý bình luận',
      children: [ 
        {
          key:'vote',
          label:"Danh sách bình luận"
        }
      ]
    },
    {
      key:'accountManage',
      icon:React.createElement(SolutionOutlined),
      label:'Quản lý tài khoản nhân viên',
      children: [ 
        {
          key:'account',
          label:"Phân quyền tài khoản",
        }
      ]
    },
  ];
  const history = useHistory();
  const username = localStorage.getItem("username");
  const onclick = e => { 
    switch (e.key) {
      case 'product': {
        history.replace({ pathname: `${childPath.listProduct}/undefined`});
        break;
      }
      case 'vote': {
        history.replace({ pathname: `${childPath.listVote}`});
        break;
      }
      case 'order': {
        history.replace({ pathname: `${childPath.listOrder}`});
        break;
      }
      case 'producttype': {
        history.replace({ pathname: `${childPath.listProductType}`});
        break;
      }
      case 'productline': {
        history.replace({ pathname: `${childPath.listProductLine}`});
        break;
      }
      case 'photo': {
        history.replace({ pathname: `${childPath.listPhoto}/undefined`});
        break;
      }
      case 'account' : {
        history.replace({ pathname: `${childPath.listAccount}`});
        break;
      }
      case 'customer': {
        history.replace({ pathname: `${childPath.listCustomer}`});
        break;
      }
      case 'des': {
        history.replace({ pathname: `${childPath.listDes}`});
        break;
      }
      case 'orderBar': {
        history.replace({ pathname: `${childPath.listOrderBarChart}/barchart`});
        break;
      }
      case 'orderdetail': {
        history.replace({ pathname: `${childPath.listOrderDetail}`});
        break;
      }
      case 'customerChart': {
        history.replace({ pathname: `${childPath.listCustomer}/chart`});
        break;
      }
      case 'user' : {
        history.replace({ pathname:  `${childPath.listUser}`});
        break;
      }
      default:
        break;
    }
  };
  const user = localStorage.getItem('user') ? localStorage.getItem('user') : '';
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const onLogoutClick = async () => {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('username');
    localStorage.removeItem('idUser');
    localStorage.removeItem('emailUser');
    message.success("Đăng xuất thành công.");
    history.replace({ pathname : rootPath.signin })
  };

  const content = (
    <div>
      <div onClick={onLogoutClick} style={{ display: 'flex', cursor: 'pointer' }}>
        <ExitToAppIcon />
        <div> Logout</div>
      </div>
    </div>
  );
  React.useEffect(() => {
    if (window.innerWidth < 1024) {
      setCollapsed(true)
    }
  }, [])
  return (
    <Layout style={{ overflow: "hidden" }}>
      <Sider width={256} trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '10px', height: '63.5px', backgroundColor: 'white' }}>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={item}
          onClick={onclick}
        />
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: '#f4f4f7', width: '100%' }}>
        <Header
          className="site-layout-background"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ececec',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          {collapsed ? (
            <MenuUnfoldOutlined style={{ color: 'black', paddingTop: '22px' }} className="trigger" onClick={toggle} />
          ) : (
            <MenuUnfoldOutlined style={{ color: 'black', paddingTop: '22px' }} className="trigger" onClick={toggle} />
          )}
          <div style={{ display: 'flex' }}>
            <span style={{ paddingRight: '20px' }}>{phoneNumber}</span>
            <div style={{ paddingTop: '10px' }}>
              <Popover content={content}>
                <BiUserCircle size={30} />
              </Popover>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
          className="site-layout-background">
          <div
            style={{
              width: '100%',
              margin: '24px 0 0 0',
            }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default VerticalDefault;
