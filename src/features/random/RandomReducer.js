import {GET_RANDOM_NUMBER, SET_STATE} from './actionTypes';
import ajaxState, {
  ajaxPending,
  ajaxFulfilled,
  ajaxRejected,
} from '../../lib/AjaxState';

const initialState = {
  ...ajaxState,
  number: undefined,
  lastName: '',
  familyName: '김',
  age: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_RANDOM_NUMBER}_PENDING`:
      return {
        ...state,
        number: undefined,
        ...ajaxPending(),
      };

    case `${GET_RANDOM_NUMBER}_FULFILLED`:
      return {
        ...state,
        number: action.payload.data,
        ...ajaxFulfilled(),
      };

    case `${GET_RANDOM_NUMBER}_REJECTED`:
      return {
        ...state,
        number: undefined,
        ...ajaxRejected(),
      };

    case GET_RANDOM_NUMBER:
      return {
        ...state,
        number: action.payload.data,
        ...ajaxFulfilled(),
      };

    case SET_STATE:
      return {
        ...state,
        [action.payload.target]: action.payload.data,
      };

    default:
      return state;
  }
};
