import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  GET_RANDOM_NUMBER,
  GET_RANDOM_NUMBER_URL,
  SET_STATE,
} from './actionTypes';
import {axiosGet, axiosGetSync} from '../../lib/HttpUtils';

/** action prefix
 *  get
 *  change
 *  add
 *  delete
 */

const useActions = (useBlockSync = false) => {
  const dispatch = useDispatch();

  const getRandomNumber = useCallback(
    async (max = '100') => {
      if (useBlockSync) {
        return await dispatch({
          type: GET_RANDOM_NUMBER,
          payload: axiosGetSync(GET_RANDOM_NUMBER_URL('1', max, 'plain')), // sync type call
        });
      } else {
        return new Promise((resolve, reject) => {
          axiosGet(GET_RANDOM_NUMBER_URL('1', max, 'plain')).then(res => {
            dispatch({
              type: GET_RANDOM_NUMBER,
              payload: new Promise((resolve, reject) => {
                resolve(res);
              }),
            });
            resolve(res);
          });
        });
      }
    },
    [useBlockSync, dispatch]
  );

  const changeStore = useCallback(
    e => {
      const {id, value} = e.target;
      dispatch({
        type: SET_STATE,
        payload: {target: id, data: value},
      });
      return value;
    },
    [dispatch]
  );

  return {getRandomNumber, changeStore};
};

export default useActions;
