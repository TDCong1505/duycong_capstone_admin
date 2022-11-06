import { convertPrice } from 'Configuration';
import React from 'react';
import styles from './StoreItem.module.scss';
import { Form, Input, message } from 'antd';
import Popup from 'reactjs-popup';
import useStyles from '@jumbo/components/Common/CryptoCard/CryptoCard.style';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { rootPath } from 'helpers/buildUrl';
import { useHistory } from 'react-router';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import ButtonReset from 'routes/Pages/components/Button/ButtonReset';
import Required from 'routes/Pages/components/Element/Required';

export default function StoreItem({ name, cost, id, userId, code }) {
  const classes = useStyles();
  const history = useHistory();
  const [form] = Form.useForm();
  const key = 'updated';
  const onFinish = async values => {
    try {
      await UserService.grantPurchase({
        userId: userId,
        itemId: id,
        depositMoney: cost,
        desc: values.desc,
      });
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: 'Thêm thành công', key, duration: 2 });
        form.resetFields();
      }, 500);
      history.replace({ pathname: `${rootPath.user}/show/${code}` });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.content}>
        <div className={styles.flex}>
          <div className={styles.title}>Đơn giá:</div>
          <div className={styles.value}>{convertPrice(cost)} VNĐ</div>
        </div>
        <div className={styles.flex}>
          <Popup modal trigger={<ButtonSubmit title="Thêm" width="100px" />}>
            {close => (
              <div
                style={{
                  width: '600px',
                  height: '100%',
                  backgroundColor: '#fff',
                  padding: '20px 16px',
                  borderRadius: '10px',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}>
                <div
                  style={{
                    marginTop: '6px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    padding: '0 0 10px 0',
                    color: '#2a2e43',
                    textAlign: 'center',
                  }}>
                  Thêm dịch vụ
                </div>

                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      form.submit();
                    }
                  }}
                  form={form}
                  onFinish={onFinish}
                  autoComplete="off">
                  <div className={styles.name}>{name}</div>
                  <div className={styles.content}>
                    <div className={styles.flex}>
                      <div className={styles.title}>Đơn giá:</div>
                      <div className={styles.value}>{convertPrice(cost)} VNĐ</div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.title}>Mô tả <Required/></div>
                    <div></div>
                    <Form.Item
                      className={classes.root}
                      name="desc"
                      rules={[{ required: true, message: 'Mô tả không được để trống' }]}>
                      <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                  </div>
                </Form>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                  <ButtonReset
                    title="Hủy"
                    width="100px"
                    onClick={() => {
                      close();
                    }}
                  />
                  <ButtonSubmit title="Lưu" width="100px" onClick={() => form.submit()} />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}
