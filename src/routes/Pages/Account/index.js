import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Account = ({ match }) =>  {
    const requestedUrl = match.url.replace(/\/$/, '');
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
          <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListAccount'))} />
          <Route path={`${requestedUrl}/new`} component={lazy(() => import('./NewAccount'))} />
          <Route path={`${requestedUrl}/show/:id`} component={lazy(() => import('./AccountDetail'))} />
          <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./EditAccount'))} />
      </Switch>
      </Suspense>
    )
  }
  export default Account;