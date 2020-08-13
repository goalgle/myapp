/* eslint-disable fp/no-mutation */
import React from 'react';
import {useRandomAPI as useRandomStore} from '../../features/random';

const StatusBar = () => {
  const {isLoading, hasError, isFulfilled} = useRandomStore();

  let status = '';
  if (isLoading) status = 'NOW LOADING....';
  else if (hasError) status = 'ERROR!!!';
  else if (isFulfilled) status = 'COMPLETE';
  else status = 'HELLO';

  return <p>{status}</p>;
};

export default StatusBar;
