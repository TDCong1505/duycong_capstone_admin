import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const OrderDetail = ({match}) => {
    const requestedUrl = match.url.replace(/\/$/, '');
    return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListOrderDetail'))} />
        <Route path={`${requestedUrl}/new`} component={lazy(() => import('./NewOrderDetail'))} />
        <Route path={`${requestedUrl}/show/:id`} component={lazy(() => import('./ShowOrderDetail'))} />
        <Route path={`${requestedUrl}/edit/:id`} component={lazy(() => import('./EditOrderDetail'))} />
      </Switch>
    </Suspense>
    )
}

export default OrderDetail;