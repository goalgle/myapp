import React, {useState, useCallback} from 'react';
import classes from '../Counter/Counter.module.css';
import {useInputFormActions, useInputFormStore} from '../../features/inputform';

const InputForm = () => {
  /** DECLARE USAGE OF STORE */
  const {num, list, objectList} = useInputFormStore();

  /** DECLARE USAGE OF ACTION */
  const {
    updateValue,
    updateListItem, // ['1', '2', '3']
    updateListItemField, // [{name:'kang', age:30, home:'suwon'},{name:'LEE', age:35, home:'cheongju'}]
    insertListItem,
    deleteListItem,
  } = useInputFormActions();

  /** PAGE STATE FOR EVENT HANDLING */
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newHome, setNewHome] = useState('');

  /** PAGE EVENT */
  const onChangeInput = e => {
    updateValue(e);
  };
  const onClickAddItem = e => {
    insertListItem(e, {name: newName, age: newAge, home: newHome});
    clearItemBucket();
  };
  const onClickRemoveItem = e => {
    deleteListItem(e);
  };

  const clearItemBucket = useCallback(() => {
    setNewName('');
    setNewAge('');
    setNewHome('');
  }, []);

  return (
    <div className={classes.counter}>
      <h2 className={classes.header}>Input Form</h2>
      숫자:
      <input id="num" type="text" value={num} onChange={onChangeInput}></input>
      <div>
        {/* {list.map((item, idx) => (
          <>
            <input
              id={'list-' + idx}
              type="text"
              value={item}
              onChange={e => {
                updateListItem(e);
              }}
            />
            <button type="button" onClick={deleteItem}>
              삭제
            </button>
          </>
        ))} */}
        {objectList.map((item, idx) => {
          return (
            <>
              <input
                id={'objectList-' + idx + '-name'}
                type="text"
                width="30%"
                value={item.name}
                onChange={updateListItemField}
              />
              <input
                id={'objectList-' + idx + '-age'}
                type="text"
                value={item.age}
                onChange={updateListItemField}
              />
              <input
                id={'objectList-' + idx + '-home'}
                type="text"
                value={item.home}
                onChange={updateListItemField}
              />
              <button
                type="button"
                id={'objectList-' + idx}
                onClick={onClickRemoveItem}>
                삭제
              </button>
            </>
          );
        })}
      </div>
      <input
        id="newName"
        placeholder="이름"
        value={newName}
        onChange={e => {
          setNewName(e.target.value);
        }}></input>
      <input
        id="newAge"
        placeholder="나이"
        value={newAge}
        onChange={e => {
          setNewAge(e.target.value);
        }}></input>
      <input
        id="newHome"
        placeholder="주소"
        value={newHome}
        onChange={e => {
          setNewHome(e.target.value);
        }}></input>
      <button id="objectList" type="button" onClick={onClickAddItem}>
        추가
      </button>
    </div>
  );
};

export default InputForm;
