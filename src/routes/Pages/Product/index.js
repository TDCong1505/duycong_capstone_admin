import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Product = ({ match }) =>  {
    const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list/:code`} />
        <Route path={`${requestedUrl}/list/:code`} component={lazy(() => import('./ListProduct'))} />
        <Route path={`${requestedUrl}/show/:code`} component={lazy(() => import('./ProductDetail'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./New'))} />
        <Route path={`${requestedUrl}/edit/:code`} component={lazy(() => import('./Edit'))} />
        <Route path={`${requestedUrl}/delete/:code`} component={lazy(() => import('./ProductDetail'))} />
        <Route component={lazy(() => import('../404'))} />
      </Switch>
    </Suspense>
  )
}
export default Product;