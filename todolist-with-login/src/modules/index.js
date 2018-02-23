import {combineReducers} from 'redux';
import todos from './todo/reducerToDo';
import  weather from '../sagas/reducerSaga'
import login from './login/reducerLogin'

export default combineReducers({todos, weather, login});