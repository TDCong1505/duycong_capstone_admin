import React from 'react';

import { rootPath } from 'helpers/buildUrl';
import { useSelector } from 'react-redux';
import {  Redirect, Route , Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import Error404 from './Pages/404';
import Product from './Pages/Product';
import Order from './Pages/Order';
import ProductType from './Pages/ProductType';
import ProductLine from './Pages/ProductLine'; 
import Photo from './Pages/Photo';
import Des from './Pages/Des';
import Customer from './Pages/Customer';
import OrderDetail from './Pages/OrderDetail';
import Vote from './Pages/Vote';
import Account from './Pages/Account';
import SignIn from '@jumbo/components/Common/authComponents/SignIn';
import Register from './Auth/Register';
import SignUp from '@jumbo/components/Common/authComponents/SignUp';
import User from '../routes/Pages/User';

const Routes = props => {
  useSelector(({ auth }) => auth);
  const location = useLocation();
  const token = localStorage.getItem('tokenUser');
  if (location.pathname === '' || location.pathname === '/' || location.pathname === rootPath.prefix) {
    return <Redirect to={rootPath.signin} />;
  } else if (!token && location.pathname !== rootPath.signin) {
    return <Redirect to={rootPath.signin} />;
  } else if (token && location.pathname === rootPath.signin) {
    return <Redirect to={`${rootPath.listProduct}/list/undefined`} />;
  }
  return (
    <React.Fragment>
      <Switch>
        <Route path={rootPath.listProduct} component={Product}/>
        <Route path={rootPath.listOrder} component={Order}/>
        <Route path={rootPath.listProductType} component={ProductType}/>
        <Route path={rootPath.listProductLine} component={ProductLine}/>
        <Route path={rootPath.listPhoto} component={Photo}/>
        <Route path={rootPath.listDes} component={Des}/>
        <Route path={rootPath.listCustomer} component={Customer}/>   
        <Route path={rootPath.listOrderDetail} component={OrderDetail}/>
        <Route path={rootPath.listVote} component={Vote}/>
        <Route path={rootPath.signin} component={SignIn} />
        <Route path={rootPath.signup} component={SignUp} />
        <Route path={rootPath.listAccount} component={Account}/>
        <Route path={rootPath.listUser}  component={User}/>
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
