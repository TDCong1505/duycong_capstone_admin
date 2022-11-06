import React from "react";
import {useParams} from "react-router-dom";
import FormInputLayout from "../Component/FormInputLayout";
import IntlMessages from "@jumbo/utils/IntlMessages";
import UserService from "services/auth/UserService";
import { getToken, handleError } from "@jumbo/utils/commonHelper";
import {message, Form} from "antd";
import moment from "moment";
import {parseInt} from "lodash";
import { getTokenUser } from "helpers/uitilities";

const breadcrumbs = [
  {label: <IntlMessages id={"sidebar.dashBoard"} />, link: "/"},
  {label: <IntlMessages id={"sidebar.listUser"} />, isActive: true},
  {label: <IntlMessages id={"sidebar.updateUser"} />, isActive: true}
];
const heading = "sidebar.updateUser";

export default function UpdateUser(){
  const {code} = useParams();
  const [ form ] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const [ dataUser, setData ] = React.useState();
  const [statusUser, setStatusUser] = React.useState();
  const [addressEnterprise, setAddressEnterprise] = React.useState([]);
  const loadDetail = async () => {
    try {
      let res = await UserService.userDetail(code);
      const data = res.data.data;
      setData(data);
      data.verifyKyc === 1 ? setStatusUser(1) : setStatusUser(0);
      setAddressEnterprise(data.addresses || [])
      // console.log(data);
      form.setFieldsValue({
        email: data.email,
        name: data.name,
        // warningDay: ,
        walletValue: data.walletValue,
        code: data.code,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        zetaAccount: data.zetaAccount,
        language: data.language,
        birthday: moment(data.birthday, dateFormat),
        status: data.status,
        avatar: data.avatar,
        isEmployee: data.isEmployee,
        isEmployer: data.isEmployer,
        isPersonal: data.isPersonal,
        verifyKyc: data.verifyKyc,
        verifyOption1: data.verifyOption1,
        verifyOption2: data.verifyOption2,
        companyId: data.companyId,
        expectSalaryFrom: data.expectSalaryFrom,
        expectSalaryTo: data.expectSalaryTo,
        expectSalaryUnit: data.expectSalaryUnit,
        expectSalaryHourlyFrom: data.expectSalaryHourlyFrom,
        expectSalaryHourlyTo: data.expectSalaryHourlyTo,
        points: data.points,
        cvLink: data,
        statusProfile: data.verifyKyc
      });
    } catch (error) {
      handleError(error);
    }
  };
  const key = "updatable";
  const onFinish = async values => {
    let dd = (new Date(values.birthday._d)).getDate()
    let mm = (new Date(values.birthday._d)).getMonth() + 1
    const yyyy = (new Date(values.birthday._d)).getFullYear()
    console.log((new Date(values.birthday._d)).toISOString());
    if (dd < 10) {
      dd = "0" + dd
    }
    if (mm < 10) {
      mm = "0" + mm
    }
    const birthday = yyyy + "-" + mm + "-" + dd
    if (dataUser.verifyKyc === 1) {
      try {
        await UserService.updateUser(code, values.reason, {
          // phoneNumber: values.phoneNumber,
          zetaAccount: values.zetaAccount,
        });
        if (values.password) {
          await UserService.changePassword(code, {
            accessToken: getTokenUser(),
            fromAdmin: "true",
            newPassword: values.password,
            confirmPassword: values.passwordConfirm
          })
        }
        form.setFieldsValue({
          reason: "",
          password: "",
          passwordConfirm: ""
        })
        message.loading({content: "Loading...", key});
        setTimeout(() => {
          message.success({content: "Update thành công", key, duration: 2});
        }, 500);
      } catch (error) {
        handleError(error);
      }
    } else {
      try {
        await UserService.updateUser(code, values.reason, {
          name: values.name,
          // phoneNumber: values.phoneNumber,
          gender: values.gender,
          zetaAccount: values.zetaAccount,
          birthday: birthday,
        });
        if (values.password) {
          await UserService.changePassword(code, {
            accessToken: getTokenUser(),
            fromAdmin: "true",
            newPassword: values.password,
            confirmPassword: values.passwordConfirm
          })
        }
        form.setFieldsValue({
          reason: "",
          password: "",
          passwordConfirm: ""
        })
        message.loading({content: "Loading...", key});
        setTimeout(() => {
          message.success({content: "Update thành công", key, duration: 2});
        }, 500);
      } catch (error) {
        handleError(error);
      }
    }
  };

  React.useEffect(() => {
    loadDetail();
  }, []);

  return (
    <FormInputLayout
      statusUser={statusUser}
      form={form}
      heading={heading}
      onFinish={onFinish}
      breadcrumbs={breadcrumbs}
      address={addressEnterprise}
      dataUser={dataUser}
    />
  );
}
