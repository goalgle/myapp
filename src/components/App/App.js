import React from 'react';
import Counter from '../Counter';
import Random from '../Random';
import InputForm from '../InputForm';
import StatusBar from '../StatusBar';
import classes from './App.module.css';

const App = () => (
  <>
    <div className={classes.container}>
      <Counter />
      <Random />
      <InputForm />
    </div>
    <div>
      <StatusBar />
    </div>
  </>
);

export default App;
