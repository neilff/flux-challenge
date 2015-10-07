import {
  REQUEST,
  INITIAL_SITH_LORD_REQUEST,
  INITIAL_SITH_LORD_SUCCESS,
  INITIAL_SITH_LORD_ERROR,
  LOAD_SITH_LORD_REQUEST,
  LOAD_SITH_LORD_SUCCESS,
  LOAD_SITH_LORD_ERROR,
  LOAD_NEXT_SITH_LORDS,
  LOAD_PREV_SITH_LORDS,
} from '../constants';

import {
  fetchDarkJedis,
  fetchDarkJedi,
} from '../api';

function loadDataset() {
  return {
    [REQUEST]: {
      types: [
        INITIAL_SITH_LORD_REQUEST,
        INITIAL_SITH_LORD_SUCCESS,
        INITIAL_SITH_LORD_ERROR,
      ],
      payload: fetchDarkJedis(),
      meta: {
        position: 2,
      },
    },
  };
}

function loadSithLord(id, position) {
  return {
    [REQUEST]: {
      types: [
        LOAD_SITH_LORD_REQUEST,
        LOAD_SITH_LORD_SUCCESS,
        LOAD_SITH_LORD_ERROR,
      ],
      payload: fetchDarkJedi(id),
      meta: {
        position,
      },
    },
  };
}

function loadNextSithLords() {
  return {
    type: LOAD_NEXT_SITH_LORDS,
  };
}

function loadPrevSithLords() {
  return {
    type: LOAD_PREV_SITH_LORDS,
  };
}

export default {
  loadDataset,
  loadSithLord,
  loadNextSithLords,
  loadPrevSithLords,
};
