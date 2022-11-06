import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
const UserIdentification = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListUserIdentification'))} />
        <Route path={`${requestedUrl}/show/:id`} component={lazy(() => import('./UserIdentificationDetail'))} />
        <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./UpdateUserIdentification'))} />
        <Route component={lazy(() => import('../../404'))} />
      </Switch>
    </Suspense>
  );
};
export default UserIdentification;
