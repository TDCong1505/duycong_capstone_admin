import React from 'react';
import { Form, Input, Drawer, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { CONFIGURATION } from 'Configuration';
import { handleError } from '@jumbo/utils/commonHelper';
import { useHistory } from 'react-router';
import UserService from 'services/auth/UserService';
import { setDataUser } from 'redux/actions/UserCurrent';
import styles from './DrawerFilter.module.scss';
import { rootPath } from 'helpers/buildUrl';
import ButtonReset from 'routes/Pages/components/Button/ButtonReset';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import { useStyles } from 'Configuration/function';
const { Option } = Select;

const DrawerFilters = ({ handleCallBack, titleFilter, placement, onClose, visible, currentPage }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const queryString = window.location.search;
  const classes = useStyles();
  const parseParams = querystring => {
    const params = new URLSearchParams(querystring);
    const obj = {};
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key);
      } else {
        obj[key] = params.get(key);
      }
    }
    return obj;
  };
  const value = parseParams(queryString);
  const userId = value.userId ? parseInt(value.userId) : null;
  const censorship = value.censorship ? parseInt(value.censorship) : null;
  const zetaAccount = value.zetaAccount ? parseInt(value.zetaAccount) : null;
  const name = value.name;
  const phoneNumber = value.phoneNumber;
  const email = value.email;
  const genders = value.genders ? parseInt(value.genders) : null;
  const isEmployee = value.isEmployee ? parseInt(value.isEmployee) : null;
  const isEmployer = value.isEmployer ? parseInt(value.isEmployer) : null;

  const onFinish = values => {
    let par = value;
    if (values.censorship || values.censorship === 0) {
      par.censorship = values.censorship;
    } else {
      delete par.censorship;
    }
    if (values.userId) {
      par.userId = values.userId;
    } else {
      delete par.userId;
    }
    if (values.zetaAccount) {
      par.zetaAccount = values.zetaAccount;
    } else {
      delete par.zetaAccount;
    }
    if (values.name) {
      par.name = values.name;
    } else {
      delete par.name;
    }
    if (values.phoneNumber) {
      par.phoneNumber = values.phoneNumber;
    } else {
      delete par.phoneNumber;
    }
    if (values.email) {
      par.email = values.email;
    } else {
      delete par.email;
    }
    if (values.genders || values.genders === 0) {
      par.genders = values.genders;
    } else {
      delete par.genders;
    }
    if (values.isEmployee || values.isEmployee === 0) {
      par.isEmployee = values.isEmployee;
    } else {
      delete par.isEmployee;
    }
    if (values.isEmployer || values.isEmployer === 0) {
      par.isEmployer = values.isEmployer;
    } else {
      delete par.isEmployer;
    }

    const sp = new URLSearchParams(par).toString();
    history.replace({ pathname: `${rootPath.user}/list`, search: '?' + sp });
  };
  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };
  const loadList = async () => {
    try {
      let res = await UserService.getAllData({
        censorship: censorship,
        userId: userId,
        zetaAccount: zetaAccount,
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        genders: genders,
        isEmployee: isEmployee,
        isEmployer: isEmployer,
        page: currentPage,
        limit: CONFIGURATION.page.limit,
      });
      dispatch(setDataUser(res.data.data));
      handleCallBack(res.data.data, res.data.meta.pagination.total);
    } catch (error) {
      handleError(error);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  React.useEffect(() => {
    form.setFieldsValue({
      censorship: censorship,
      userId: userId,
      zetaAccount: zetaAccount,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      genders: genders,
      isEmployee: isEmployee,
      isEmployer: isEmployer,
    });
    loadList();
  }, [currentPage]);

  return (
    <Drawer title={titleFilter} placement={placement} onClose={onClose} visible={visible}>
      <Form
        name="basic"
        form={form}
        initialValues={{
          remember: true,
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            form.submit();
          }
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <div>
          <label className={classes.label}>Trạng thái</label>
          <Form.Item className={classes.input} name="censorship">
            <Select>
              {CONFIGURATION.censorship.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>ID</label>
          <Form.Item className={classes.input} name="userId">
            <Input />
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>Tài khoản Zeta</label>
          <Form.Item className={classes.input} name="zetaAccount">
            <Select>
              {CONFIGURATION.zetaJob.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>Tên</label>
          <Form.Item className={classes.input} name="name">
            <Input />
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>SĐT</label>
          <Form.Item className={classes.input} name="phoneNumber">
            <Input />
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>Email</label>
          <Form.Item className={classes.input} name="email">
            <Input />
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>Giới tính</label>
          <Form.Item className={classes.input} name="genders">
            <Select>
              {CONFIGURATION.gender.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>EE</label>
          <Form.Item className={classes.input} name="isEmployee">
            <Select>
              {CONFIGURATION.isEmployEE.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>ER</label>
          <Form.Item className={classes.input} name="isEmployer">
            <Select>
              {CONFIGURATION.isEmployER.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
      <div style={{ textAlign: 'center' }}>
        <ButtonReset title="Đặt lại" width="100px" onClick={onReset} />
        <ButtonSubmit title="Tìm kiếm" width="100px" onClick={() => form.submit()} />
      </div>
    </Drawer>
  );
};

export default DrawerFilters;
