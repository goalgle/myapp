/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
import {produce} from 'immer';
import {nanoid} from 'nanoid';
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
    {name: 'Kang', age: 45, home: 'suwon', id: nanoid()},
    {name: 'Kwak', age: 44, home: 'seoul', id: nanoid()},
  ],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_VALUE:
        draft[action.payload.target] = action.payload.data;
        break;
      case INSERT_LIST_ITEM:
        draft[action.payload.target].push(action.payload.data);
        break;
      case DELETE_LIST_ITEM:
        draft[action.payload.target].splice(
          draft[action.payload.target].findIndex(
            item => item.id === action.payload.data
          ),
          1
        );
        break;
      case UPDATE_LIST_ITEM: {
        const target = action.payload.target.split('-');
        draft[target[0]][[target[1]]] = action.payload.data;
        break;
      }
      case UPDATE_LIST_ITEM_FIELD: {
        const target = action.payload.target.split('-');
        draft[target[0]][[target[1]]][target[2]] = action.payload.data;
        break;
      }
      default:
        break;
    }
  });
