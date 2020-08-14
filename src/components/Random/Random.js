import React, {useState, useEffect, useCallback} from 'react';
import {
  useActions as useRandomActions,
  useRandomAPI as useRandomStore,
} from '../../features/random';
import classes from './Random.module.css';

const Random = () => {
  /**STORE - useSelector*/
  const {number, isLoading, hasError, isFulfilled} = useRandomStore();

  /** Define pristine state condition, when user didn't do any actions */
  const isPristine = !isLoading && !hasError && !isFulfilled;

  /**ACTION - You can choose mode : SYNC or ASYNC*/
  const {getRandomNumber: getRanNumSync} = useRandomActions('SYNC');
  const {getRandomNumber: getRanNumAsync} = useRandomActions('ASYNC');

  /**WITH ASYNC MODE : PROMISE */
  const onClickAsyncButton = () => {
    getRanNumAsync('100').then(res => {
      alert(res.data + 100);
    });
  };

  /**WITH SYNC MODE */
  const onClickSyncButton = useCallback(async () => {
    const tempResponse = await getRanNumSync('50');
    console.log('SYNC response : ', tempResponse);
  }, [getRanNumSync]);

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
