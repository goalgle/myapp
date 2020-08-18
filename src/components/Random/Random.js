import React, {useCallback} from 'react';
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
  const {getRandomNumber: getRandomNumBySync} = useRandomActions('SYNC');
  const {getRandomNumber: getRandomNumByAsync} = useRandomActions('ASYNC');

  /**WITH ASYNC MODE : PROMISE */
  const onClickAsyncButton = () => {
    getRandomNumByAsync('100')
      .then(res => getRandomNumByAsync(res.data))
      .then(res => getRandomNumByAsync(res.data))
      .then(res => getRandomNumByAsync(res.data));

    // Promise.all([
    //   getRandomNumByAsync('100'),
    //   getRandomNumByAsync('50'),
    //   getRandomNumByAsync('10'),
    // ]).then(() => {
    //   alert('all done');
    // });
  };

  /**WITH SYNC MODE */
  const onClickSyncButton = useCallback(async () => {
    let res = await getRandomNumBySync('100');
    console.log('SYNC TEST ', res.value.data);
    res = await getRandomNumBySync(res.value.data);
    console.log('SYNC TEST ', res.value.data);
    res = await getRandomNumBySync(res.value.data);
    console.log('SYNC TEST ', res.value.data);
    res = await getRandomNumBySync(res.value.data);
    console.log('SYNC TEST ', res.value.data);
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
