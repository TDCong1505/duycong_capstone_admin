import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
const UserRole = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListUserRole'))} />
        <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./UpdateUserRole'))} />
        <Route path={`${requestedUrl}/show/:id`} component={lazy(() => import('./UserRoleDetail'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./CreateUserRole'))} />
        <Route component={lazy(() => import('../../404'))} />
      </Switch>
    </Suspense>
  );
};
export default UserRole;
