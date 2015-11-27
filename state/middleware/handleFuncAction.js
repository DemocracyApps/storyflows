// Copied from
export default function handleFuncActionMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      console.log("I'm in the middleware");
      action(dispatch, getState);
    } 
    else {
      next(action);
    }
  }
}
