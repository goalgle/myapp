import React, {useState, useEffect, useCallback} from 'react';
import {
  useActions as useRandomActions,
  useRandomAPI as useRandomStore,
} from '../../features/random';
import classes from './Random.module.css';

const Random = () => {
  /**STORE - useSelector*/
  const {number, isLoading, hasError, isFulfilled} = useRandomStore();

  /**ACTION - useDispatch, axios*/
  const {getRandomNumber: getRanNumSync} = useRandomActions('SYNC');
  const {getRandomNumber: getRanNumAsync} = useRandomActions('ASYNC');

  /** Define pristine state condition, when user didn't do any actions */
  const isPristine = !isLoading && !hasError && !isFulfilled;

  /** 리덕스의 값이 아닌 페이지의 state 변수로 별도 처리하기 위해 ASYNC 호출 후 customCallback 처리 */
  const [stateNumber, setStateNumber] = useState(number);

  useEffect(() => {
    setStateNumber(number);
  }, [number]);

  const onClickAsyncButton = () => {
    getRanNumAsync('100').then(res => {
      setTimeout(() => {
        setStateNumber(res.data + 100);
      }, 1500);
    });
  };
  /** ASYNC customCallback 처리 예 끝 */

  /** SYNC 의 경우도 redux 값을 사용할 경우 비동기 처리되어 값이 즉각 반영되지 않을수도 있다??  */
  const onClickSyncButton = useCallback(async () => {
    const tempResponse = await getRanNumSync('50');
    console.log('SYNC response : ', tempResponse);

    // dispatch의 상태 변화 읽는 방법이 가장 정확하지만 SYNC AWAIT 방식에 맞지 않다.
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
          Number from random.org: <strong>{stateNumber}</strong>
        </div>
      )}
      {hasError && <div>Ups...</div>}
    </div>
  );
};

export default Random;
