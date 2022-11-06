import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box, Paper } from '@material-ui/core';
import { } from '@material-ui/core';
import { Form, Input, Button, Select } from 'antd';
import { useParams } from 'react-router';
import { CONFIGURATION } from 'Configuration';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { rootPath } from 'helpers/buildUrl';
import { useStyles } from 'Configuration/function';
import styles from './FromInputLayout.module.scss';
import { IoArrowBack } from 'react-icons/io5';
const { Option } = Select;

export default function FormInputLayout({ form, heading, breadcrumbs, onFinish }) {
  const [disable, setDisable] = React.useState(true);
  const { id } = useParams();
  const onReset = () => {
    form.resetFields();
  };
  const classes = useStyles();
  const handleChangeStatus = value => {
    if (value === 2) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  return (
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
      <div className={styles.container_headerPage}>
        <Button className={styles.container_headerPage_buttonBack} onClick={createBrowserHistory().goBack}>
          <IoArrowBack />
        </Button>
        {heading === 'sidebar.updateBlog' ? (
          <div>
            <Link to={`${rootPath.userIdentification}/show/${id}`}>
              <Button>Show</Button>
            </Link>
          </div>
        ) : null}
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <Form
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                form.submit();
              }
            }}
            className={styles.form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            form={form}
            onFinish={onFinish}
            autoComplete="off">
            <Form.Item label="Trạng thái" className={classes.input} name="status">
              <Select onChange={handleChangeStatus}>
                {CONFIGURATION.statusUserIdentification.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Loại ảnh" className={classes.input} name="identificationType">
              <Select>
                {CONFIGURATION.identificationType.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[{ required: !disable, message: 'Please input your reason!' }]}
              label="Lý do từ chối"
              className={classes.input}
              name="reasonReject">
              <Input disabled={disable} />
            </Form.Item>

            <Form.Item className={styles.buttonSubmit}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Paper>
      </Box>
    </PageContainer>
  );
}
