import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers(history));

function configureStore(initialState = {}) {
  const store = createStore(persistedReducer, initialState, bindMiddleware([routeMiddleware, thunk]));
  let persistor = persistStore(store);
  return { store, persistor };
}
export default configureStore;
export { history };
