import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
const User = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListUser'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./New'))} />
        <Route path={`${requestedUrl}/edit/:code`} component={lazy(() => import('./UpdateUser'))} />
        <Route path={`${requestedUrl}/show/:code`} component={lazy(() => import('./UserDetail'))} />
        <Route path={`${requestedUrl}/recharge/:code`} component={lazy(() => import('./Recharge'))} />
        <Route path={`${requestedUrl}/store-purchase/:code`} component={lazy(() => import('./StorePurchase'))} />
        <Route path={`${requestedUrl}/portfolio/:code`} component={lazy(() => import('./Portfolio'))} />
        <Route component={lazy(() => import('../../404'))} />
      </Switch>
    </Suspense>
  );
};
export default User;
