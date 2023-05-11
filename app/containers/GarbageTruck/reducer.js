import produce from 'immer';
import { GET_DETAIL_GARBAGETRUCK_SUCCESS, RESET_REDUX } from './constants';

export const initialState = {
  isLoading: false,
  listGarbageTruck: [],
};
/* eslint-disable default-case, no-param-reassign */
const gabageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_REDUX:
        draft.isLoading = false;
        draft.listGarbageTruck = [];
        break;
      case GET_DETAIL_GARBAGETRUCK_SUCCESS:
        draft.isLoading = false;
        draft.listGarbageTruck = action.data;
    }
  });

export default gabageReducer;
