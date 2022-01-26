import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createBrowserHistory } from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import createRootReducer from "./reducers";
import sagas from "./sagas";

export const history = createBrowserHistory();
const connectRouterHistory = connectRouter(history);
const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState={}) {
  const reactRouterMiddleware = routerMiddleware(history);

  const middlewares = [
    reactRouterMiddleware,
    sagaMiddleware,
  ];

  sagaMiddleware.run(sagas);

  return createStore<any, any, any, any>(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );

}

function configureStoreDev(initialState={}) {

  const reactRouterMiddleware = routerMiddleware(history);

  const middlewares = [
    reactRouterMiddleware,
    sagaMiddleware,
    reduxImmutableStateInvariant()
  ];

  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept('../state/reducers', () => {
      const nextRootReducer = require("./reducers").default; // eslint-disable-line global-require
      // @ts-ignore
      store.replaceReducer(connectRouterHistory(nextRootReducer));
    });
  }
  sagaMiddleware.run(sagas);

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
