import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Des = ({ match }) =>  {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListDes'))} />
        <Route path={`${requestedUrl}/show/:id`} component={lazy(() => import('./DesDetail'))} />
        <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./EditDes'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./NewDes'))} />
    </Switch>
    </Suspense>
  )
}
export default Des;