import userInfo from './userReduce';
import {combineReducers} from 'redux';

const rootReduce = combineReducers({
    userInfo
})

export default rootReduce;