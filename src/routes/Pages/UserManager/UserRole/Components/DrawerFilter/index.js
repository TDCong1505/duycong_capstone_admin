import React from 'react';
import { Form, Input, Button, Drawer, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { CONFIGURATION } from 'Configuration';
import { handleError } from '@jumbo/utils/commonHelper';
import { useHistory } from 'react-router';
import UserService from 'services/auth/UserService';
import { setDataUserRole } from 'redux/actions/UserCurrent';
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
  const name = value.name;
  const role = value.role;

  const onFinish = values => {
    let par = value;
    if (values.userId || values.userId === 0) {
      par.userId = values.userId;
    } else {
      delete par.userId;
    }
    if (values.name) {
      par.name = values.name;
    } else {
      delete par.name;
    }
    if (values.role) {
      par.role = values.role;
    } else {
      delete par.role;
    }

    const sp = new URLSearchParams(par).toString();
    history.replace({ pathname: `${rootPath.fjobUserRole}/list`, search: '?' + sp });
  };
  const onFinishFailed = errorInfo => {};
  const loadList = async () => {
    try {
      let res = await UserService.getAllUserRole({
        userId: userId,
        name: name,
        role: role,
      });
      dispatch(setDataUserRole(res.data.data));
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
      userId: userId,
      name: name,
      role: role,
    });
    loadList();
  }, []);

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
          <label className={classes.label}>User ID</label>
          <Form.Item className={classes.input} name="userId">
            <Input />
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>Tên</label>
          <Form.Item className={classes.input} name="name">
            <Input />
          </Form.Item>
        </div>

        <div>
          <label className={classes.label}>Quyền hạn</label>
          <Form.Item className={classes.input} name="role">
            <Select>
              {CONFIGURATION.role.map(item => (
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
