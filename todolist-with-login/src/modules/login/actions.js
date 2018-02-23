import * as actionTypes from './actionTypes';

export const  authenticationSuccess = (login, password,userId) =>({
  type: actionTypes.AUTHENTICATION_SUCCESS,
  login,
  password,
  userId,
});

export const authenticationFail = () => ({
  type: actionTypes.AUTHENTICATION_FAIL,
});