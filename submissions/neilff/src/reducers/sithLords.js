import {
  INITIAL_SITH_LORD_SUCCESS,
  LOAD_SITH_LORD_REQUEST,
  LOAD_SITH_LORD_SUCCESS,
  LOAD_NEXT_SITH_LORDS,
} from '../constants';

import { handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const INITIAL_STATE = fromJS({
  0: {
    idx: 0,
    id: null,
    name: null,
    isLoading: false,
  },
  1: {
    idx: 1,
    id: null,
    name: null,
    isLoading: false,
  },
  2: {
    idx: 2,
    id: null,
    name: null,
    isLoading: false,
  },
  3: {
    idx: 3,
    id: null,
    name: null,
    isLoading: false,
  },
  4: {
    idx: 4,
    id: null,
    name: null,
    isLoading: false,
  },
});

const sithLordsReducer = handleActions({
  [INITIAL_SITH_LORD_SUCCESS]: (state, { payload }) => {
    return state.mergeDeep({
      [payload.meta.position]: payload.data,
      [(payload.meta.position - 1)]: {
        id: payload.data.apprentice.id,
      },
      [(payload.meta.position + 1)]: {
        id: payload.data.master.id,
      },
    });
  },
  [LOAD_SITH_LORD_REQUEST]: (state, { payload }) => {
    const idx = payload.meta.position.toString();
    return state.setIn([idx, 'isLoading'], true);
  },
  [LOAD_SITH_LORD_SUCCESS]: (state, { payload }) => {
    const merge = {
      [payload.meta.position]: {
        ...payload.data,
        isLoading: false,
      },
    };

    if (payload.meta.position - 1 >= 0) {
      merge[(payload.meta.position - 1)] = {
        id: payload.data.apprentice.id,
      };
    }

    if (payload.meta.position + 1 <= 4) {
      merge[(payload.meta.position + 1)] = {
        id: payload.data.master.id,
      };
    }

    return state.mergeDeep(merge);
  },
  [LOAD_NEXT_SITH_LORDS]: (state, { payload }) => {
    return state
      .skip(2)
      .toList()
      .map((i, idx) => i.set('idx', idx))
      .reduce((acc, i) => {
        return acc.set(i.get('idx'), i);
      }, Map())
      .merge(fromJS({
        3: {
          idx: 3,
          id: state.getIn(['4', 'master', 'id']),
          name: null,
          isLoading: false,
        },
        4: {
          idx: 4,
          id: null,
          name: null,
          isLoading: false,
        },
      }));
  }
}, INITIAL_STATE);

export default sithLordsReducer;
