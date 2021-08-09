export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export interface SignupPayload {
  email: string,
  name: string,
  password: string,
};

export interface SignupAction {
  type: typeof SIGNUP,
  payload: SignupPayload,
};

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS,
}

export interface SignupFailAction {
  type: typeof SIGNUP_FAIL,
  msg: string,
}

export const signup = (payload: SignupPayload): SignupAction => ({
  type: SIGNUP,
  payload,
});

export const signupSuccess = (): SignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
});

export const signupFail = (msg: string): SignupFailAction => ({
  type: SIGNUP_FAIL,
  msg,
});

export type AuthType =
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction