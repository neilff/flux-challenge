import {REQUEST} from '../constants';
import invariant from 'invariant';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function isDefined(val) {
  return val && typeof val !== 'undefined' && val !== null;
}

function isArray(val) {
  return val && Array.isArray(val);
}

export default function requestMiddleware({dispatch}) {
  return next => action => {
    if (typeof action[REQUEST] === 'undefined') {
      return next(action);
    }

    const {
      types,
      payload,
      meta,
    } = action[REQUEST];

    invariant(
      isDefined(types) && isArray(types) && types.length === 3,
      '[REQUEST] types property must contain an array with three action types.'
    );

    invariant(
      isPromise(payload),
      '[REQUEST] payload must be a promise.'
    );

    const [
      PENDING,
      FULFILLED,
      REJECTED,
    ] = types;

    dispatch({
      type: PENDING,
      payload: {
        meta,
      },
    });

    return payload.then(
      result => {
        const response = {
          data: result.data,
          meta,
        };

        dispatch({
          type: FULFILLED,
          payload: response,
        });
      },
      error => {
        const response = {
          ...error,
          meta,
        };

        dispatch({
          type: REJECTED,
          payload: response,
          error: true,
        });
      }
    );
  };
}
