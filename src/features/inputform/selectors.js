import {useSelector} from 'react-redux';

const useInputFormStore = () => useSelector(state => state.inputform);

export default useInputFormStore;
