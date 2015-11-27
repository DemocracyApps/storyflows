import { createStore, applyMiddleware } from 'redux';
import handleFunctionAction from './middleware/handleFuncAction';
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  handleFunctionAction
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}