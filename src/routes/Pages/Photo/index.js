import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Photo = ({ match }) =>  {
    const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list/:code`} />
        <Route path={`${requestedUrl}/list/:code`} component={lazy(() => import('./ListPhoto'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./NewPhoto'))} />
        <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./EditPhoto'))} />
        <Route path={`${requestedUrl}/delete/:id`} component={lazy(() => import('./DeletePhoto'))} />
      </Switch>
    </Suspense>
  )
}
export default Photo;