import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  UPDATE_VALUE,
  UPDATE_LIST_ITEM,
  INSERT_LIST_ITEM,
  DELETE_LIST_ITEM,
  UPDATE_LIST_ITEM_FIELD,
} from './actionTypes';

/** ACTION PREFIX
 *  get , update , add , delete
 */

const useInputFormActions = () => {
  const dispatch = useDispatch();

  const updateValue = useCallback(
    e => {
      const {id, value} = e.target;
      dispatch({
        type: UPDATE_VALUE,
        payload: {target: id, data: value},
      });
      return value;
    },
    [dispatch]
  );

  const updateListItem = useCallback(
    e => {
      const {id, value} = e.target;
      dispatch({
        type: UPDATE_LIST_ITEM,
        payload: {target: id, data: value},
      });
    },
    [dispatch]
  );

  const insertListItem = useCallback(
    (e, item) => {
      dispatch({
        type: INSERT_LIST_ITEM,
        payload: {target: e.target.id, data: item},
      });
    },
    [dispatch]
  );

  const deleteListItem = useCallback(
    e => {
      const props = e.target.id.split('-');
      dispatch({
        type: DELETE_LIST_ITEM,
        payload: {target: props[0], data: props[1]},
      });
    },
    [dispatch]
  );

  const updateListItemField = useCallback(
    e => {
      const {id, value} = e.target;
      dispatch({
        type: UPDATE_LIST_ITEM_FIELD,
        payload: {target: id, data: value},
      });
    },
    [dispatch]
  );

  return {
    updateValue,
    insertListItem,
    deleteListItem,
    updateListItem,
    updateListItemField,
  };
};

export default useInputFormActions;
