import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SIGNUP, SignupAction, signupFail, signupSuccess } from "../actions";
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

export default function* authSaga () {
  yield takeEvery(SIGNUP, handleSignup);
}