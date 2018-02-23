import * as actionTypes from './actionTypes';
import localStorageApi from '../../services/localStorageApi';

const user = localStorageApi.get('user');

let initialState = user ? {...user, isAuthenticated: true} : {
  login: '', 
  password: '',
  userId: '',
  isAuthenticated: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        login: action.login,
        password: action.password,
        userId: action.userId,
        isAuthenticated: true,
      };
     
    case actionTypes.AUTHENTICATION_FAIL:
      return {
        ...state,
        login: '',
        password: '',
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default login;