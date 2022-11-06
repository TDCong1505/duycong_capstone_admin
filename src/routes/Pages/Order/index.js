import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Order = ({match}) => {
    const requestedUrl = match.url.replace(/\/$/, '');
    return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListOrder'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./NewOrder'))} />
        <Route path={`${requestedUrl}/show/:id`} component={lazy(() => import('./OrderDetail'))} />
        <Route path={`${requestedUrl}/barchart`} component={lazy(() => import('./OrderBarChart'))} />
        <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./EditOrder'))} />
      </Switch>
    </Suspense>
    )
}

export default Order;