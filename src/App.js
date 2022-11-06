import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import 'antd/dist/antd.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import configureStore, { history } from './redux/store';
import AppWrapper from './@jumbo/components/AppWrapper';
import AppContextProvider from './@jumbo/components/contextProvider/AppContextProvider';
import { PersistGate } from 'redux-persist/integration/react';
import 'styles/index.scss'
import './App.css';
import Routes from './routes';

export const store = configureStore().store;
export const persistor = configureStore().persistor;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <AppContextProvider>
          <AppWrapper>
            <Switch>
              <Routes />
            </Switch>
          </AppWrapper>
        </AppContextProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;
