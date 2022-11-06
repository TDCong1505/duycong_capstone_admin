import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const ProductType = ({ match }) =>  {
    const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListProductLine'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./NewProductLine'))} />
        <Route path={`${requestedUrl}/show/:code`} component={lazy(() => import('./ProductLineDetail'))}/>
        <Route path={`${requestedUrl}/edit/:code`} component={lazy(() => import('./EditProductLine'))}/>
        </Switch>
    </Suspense>
  )
}
export default ProductType;