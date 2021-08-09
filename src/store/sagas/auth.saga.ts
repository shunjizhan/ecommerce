import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SIGNIN, SigninAction, signinFail, signinSuccess, SIGNUP, SignupAction, signupFail, signupSuccess } from "../actions";
import { API } from '../../config';

function* handleSignup (action: SignupAction) {
  console.log('handleSignup')
  try {
    yield axios.post(`${API}/signup`, action.payload);
    yield put(signupSuccess());
  } catch (e) {
    yield put(signupFail(e.response.data.error));
  }
}

function* handleSignin (action: SigninAction): any {
  try {
    const res = yield axios.post(`${API}/signin`, action.payload);
    window.localStorage.setItem('jwt', JSON.stringify(res.data));
    yield put(signinSuccess());
  } catch (e) {
    yield put(signinFail(e.response.data.error));
  }
}

export default function* authSaga () {
  yield takeEvery(SIGNUP, handleSignup);
  yield takeEvery(SIGNIN, handleSignin);
}