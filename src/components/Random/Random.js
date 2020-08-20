import React, {useCallback, useState, useEffect} from 'react';
import {
  useActions as useRandomActions,
  useRandomAPI as useRandomStore,
} from '../../features/random';
import classes from './Random.module.css';

const Random = () => {
  /**STORE - useSelector*/
  const {number} = useRandomStore();
  const {isLoading, hasError, isFulfilled} = useRandomStore(); // block state

  /** Define pristine state condition, when user didn't do any actions */
  const isPristine = !isLoading && !hasError && !isFulfilled;

  /** GET ACTION - LOADING BAR or NOT*/
  const {getRandomNumber: getRandomNumWithBlock} = useRandomActions(true);
  const {getRandomNumber: getRandomNum} = useRandomActions();

  /** SET ACTION - COMMON TYPE */
  const {setTargetState} = useRandomActions();

  /** PAGE STATE */
  const [age, setAge] = useState(10);
  const [name, setName] = useState('홍길동');

  /** NORMAL ASYNC MODE WITH PROMISE */
  const onClickAsyncButton = async () => {
    // getRandomNum('100').then(res => getRandomNum(res.data));
    // getRandomNum('200');

    Promise.all([
      getRandomNum('100'),
      getRandomNum('50'),
      getRandomNum('10'),
    ]).then(responses => {
      responses.forEach(response => {
        console.log('each response : ', response.data);
      });
      console.log('all done');
    });
  };

  /**BLOCK MODE WITH AWAIT - WHEN LOADING BAR NECESSARY */
  const onClickSyncButton = useCallback(async () => {
    let res = await getRandomNumWithBlock('100');
    console.log('response : ', res.value.data);
  }, [getRandomNumWithBlock]);

  /**UPDATE REDUX STORE AND PAGE STATE */
  const onChangeAge = useCallback(
    e => {
      setAge(setTargetState(e));
    },
    [setTargetState]
  );

  const onChangeName = useCallback(
    e => {
      setName(setTargetState(e));
    },
    [setTargetState]
  );

  return (
    <div className={classes.counter}>
      <h2 className={classes.header}>Random Number</h2>
      <button
        disabled={isLoading}
        className={classes.button}
        type="button"
        onClick={onClickSyncButton}>
        LOADING BAR
      </button>
      <button
        disabled={isLoading}
        className={classes.button}
        type="button"
        onClick={onClickAsyncButton}>
        NORMAL ASYNC
      </button>
      <p />
      {isPristine && <div>Click the button to get random number</div>}
      {isLoading && <div>Getting number</div>}
      {isFulfilled && (
        <div>
          Number from random.org: <strong>{number}</strong>
        </div>
      )}
      {hasError && <div>Ups...</div>}
      나이:
      <input id="age" type="text" value={age} onChange={onChangeAge}></input>
      <p />
      이름:
      <input id="name" type="text" value={name} onChange={onChangeName}></input>
    </div>
  );
};

export default Random;
