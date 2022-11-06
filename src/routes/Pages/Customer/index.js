import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Customer = ({ match }) =>  {
    const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListCustomer'))} />
        <Route path={`${requestedUrl}/show/:id`} component={lazy(() => import('./ShowCustomer'))} />
        <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./EditCustomer'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./NewCustomer'))} />
        <Route path={`${requestedUrl}/chart`} component={lazy(() => import('./CustomerChart'))} />
    </Switch>
    </Suspense>
  )
}
export default Customer;
;