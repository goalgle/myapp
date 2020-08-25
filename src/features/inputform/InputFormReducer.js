/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
import {produce} from 'immer';
import {
  UPDATE_VALUE,
  INSERT_LIST_ITEM,
  DELETE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  UPDATE_LIST_ITEM_FIELD,
} from './actionTypes';

const initialState = {
  num: 0,
  list: ['1', '2', '3'],
  objectList: [
    {name: 'Kang', age: 45, home: 'suwon'},
    {name: 'Kwak', age: 44, home: 'seoul'},
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return produce(state, draft => {
        draft[action.payload.target] = action.payload.data;
      });
    case INSERT_LIST_ITEM:
      return produce(state, draft => {
        draft[action.payload.target].push(action.payload.data);
      });
    case DELETE_LIST_ITEM:
      return produce(state, draft => {
        draft[action.payload.target].splice(action.payload.data, 1); // data must be index
      });
    case UPDATE_LIST_ITEM:
      return produce(state, draft => {
        const target = action.payload.target.split('-');
        draft[target[0]][[target[1]]] = action.payload.data;
      });
    case UPDATE_LIST_ITEM_FIELD:
      return produce(state, draft => {
        const target = action.payload.target.split('-');
        draft[target[0]][[target[1]]][target[2]] = action.payload.data;
      });

    default:
      return state;
  }
};
