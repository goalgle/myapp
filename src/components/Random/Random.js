import React, {useState, useEffect, useCallback} from 'react';
import {
  useActions as useRandomActions,
  useRandomAPI as useRandomStore,
} from '../../features/random';
import classes from './Random.module.css';
import {returnRejectedPromiseOnError} from 'redux-axios-middleware';

const Random = () => {
  /**STORE - useSelector*/
  const {number, isLoading, hasError, isFulfilled} = useRandomStore();

  /** Define pristine state condition, when user didn't do any actions */
  const isPristine = !isLoading && !hasError && !isFulfilled;

  /**ACTION - You can choose mode : SYNC or ASYNC*/
  const {getRandomNumber: getRandomNumBySync} = useRandomActions('SYNC');
  const {getRandomNumber: getRandomNumByAsync} = useRandomActions('ASYNC');

  /**WITH ASYNC MODE : PROMISE */
  const onClickAsyncButton = () => {
    getRandomNumByAsync('100').then(res => {
      console.log('ASYNC response : ', res);
    });
  };

  /**WITH SYNC MODE */
  const onClickSyncButton = useCallback(async () => {
    const res = await getRandomNumBySync('50');
    console.log('SYNC response : ', res);
  }, [getRandomNumBySync]);

  return (
    <div className={classes.counter}>
      <h2 className={classes.header}>Random Number</h2>
      <button
        disabled={isLoading}
        className={classes.button}
        type="button"
        onClick={onClickSyncButton}>
        SYNC
      </button>
      <button
        disabled={isLoading}
        className={classes.button}
        type="button"
        onClick={onClickAsyncButton}>
        ASYNC
      </button>
      {isPristine && <div>Click the button to get random number</div>}
      {isLoading && <div>Getting number</div>}
      {isFulfilled && (
        <div>
          Number from random.org: <strong>{number}</strong>
        </div>
      )}
      {hasError && <div>Ups...</div>}
    </div>
  );
};

export default Random;
