import {useCallback, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {GET_RANDOM_NUMBER, GET_RANDOM_NUMBER_URL} from './actionTypes';
import {axiosGet, axiosGetSync} from '../../lib/HttpUtils';

const useActions = (ajaxType = 'ASYNC') => {
  const dispatch = useDispatch();

  if (ajaxType !== 'SYNC' && ajaxType !== 'ASYNC') throw new Error();

  /**USAGE SYNC: let val = await getRandomNumber(null, '50') */
  /**USAGE ASYNC: getRandomNumber(customCallback, '100') */
  const getRandomNumber = useCallback(
    async (customCallback = null, max = '100') => {
      if (ajaxType === 'SYNC') {
        dispatch({
          type: GET_RANDOM_NUMBER,
          payload: axiosGetSync(GET_RANDOM_NUMBER_URL('1', max, 'plain')), // sync type call
        });
      } else {
        // ASYNC
        axiosGet(GET_RANDOM_NUMBER_URL('1', max, 'plain')).then(res => {
          dispatch({
            type: GET_RANDOM_NUMBER,
            payload: res,
          });
          if (customCallback) customCallback(res);
        });
      }
    },
    [ajaxType, dispatch]
  );

  return {getRandomNumber};
};

export default useActions;
