import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import { v4 as uuidv4 } from 'uuid';
import AuthService from 'services/auth/AuthService';
import { setAuthUser } from 'redux/actions/Auth';
import { setToken } from 'redux/actions/Token';
import { setDataInit } from 'redux/actions/InitData';
import { handleError } from '@jumbo/utils/commonHelper';
import axios from 'axios';
import { CONFIGURATION } from 'Configuration';
import { childPath, prefix, rootPath } from 'helpers/buildUrl';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';
import { Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import UserService from 'services/auth/UserService';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    fontFamily: 'Roboto',
    color: theme.palette.text.primary,
    fontSize: '30px',
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));
const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const history = createBrowserHistory();
  const handleClickRegister = () => {
    history.replace({ pathname : rootPath.signup });
  }
  const onSubmit = async () => {
   try {
    let res = await AuthService.onLogin({
      username:username,
      password:password,
    })
    let resUser = await UserService.getByUserName(username);
    localStorage.setItem('tokenUser',res.data);
    localStorage.setItem('username',username);
    localStorage.setItem("idUser",resUser.data.id);
    history.go({ pathname : `${childPath.listProduct}/undefined` });
    await message.success("Đăng nhập thành công");  
   } catch (error){
    console.log(error);
   }  
  };
  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={`${prefix}/images/auth/login-img.png`} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Đăng nhập
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              required
              label={"Tên đăng nhập"}
              fullWidth
              id="username"
              onChange={event => setUsername(event.target.value)}
              defaultValue={username}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              required
              type="password"
              id="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} style={{ fontFamily: 'Roboto' }} variant="contained" color="primary">
              <IntlMessages id="appModule.signIn" />
            </Button>
            <Button onClick={handleClickRegister} style={{ fontFamily: 'Roboto' }} variant="contained" color="primary">
              Đăng ký
            </Button>
          </Box>
        </form>
        {dispatch(AuhMethods[method].getSocialMediaIcons())}
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
