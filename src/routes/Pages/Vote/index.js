import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Vote = ({match}) => {
    const requestedUrl = match.url.replace(/\/$/, '');
    return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/list`} />
        <Route path={`${requestedUrl}/list`} component={lazy(() => import('./ListVote'))} />
      </Switch>
    </Suspense>
    )
}

export default Vote;