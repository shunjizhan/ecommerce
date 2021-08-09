export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const RESET_SIGNUP = 'RESET_SIGNUP';

export const SIGNIN = 'SIGNIN';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';


/* ---------- sign up ---------- */
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

export interface ResetSignupAction {
  type: typeof RESET_SIGNUP,
}

/* ---------- sign in ---------- */
export interface SigninPayload {
  email: string,
  password: string,
};

export interface SigninAction {
  type: typeof SIGNIN,
  payload: SigninPayload,
};

export interface SigninSuccessAction {
  type: typeof SIGNIN_SUCCESS,
}

export interface SigninFailAction {
  type: typeof SIGNIN_FAIL,
  msg: string,
}

/* ---------- sign up ---------- */
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

export const resetSignup = (): ResetSignupAction => ({
  type: RESET_SIGNUP,
});

/* ---------- sign in ---------- */
export const signin = (payload: SigninPayload): SigninAction => ({
  type: SIGNIN,
  payload,
});

export const signinSuccess = (): SigninSuccessAction => ({
  type: SIGNIN_SUCCESS,
});

export const signinFail = (msg: string): SigninFailAction => ({
  type: SIGNIN_FAIL,
  msg,
});


/* ---------- both ---------- */
export type AuthType =
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction
  | ResetSignupAction
  | SigninAction
  | SigninSuccessAction
  | SigninFailAction


/* ---------- category ---------- */
export const GET_CATEGORY = "GET_CATEGORY"
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS"
export interface Category {
  _id: string
  name: string
}

export interface GetCategoryAction {
  type: typeof GET_CATEGORY
}

export interface GetCategorySuccessAction {
  type: typeof GET_CATEGORY_SUCCESS
  payload: Category[]
}

export const getCategory = (): GetCategoryAction => ({
  type: GET_CATEGORY
})

export const getCategorySuccess = (
  payload: Category[]
): GetCategorySuccessAction => ({
  type: GET_CATEGORY_SUCCESS,
  payload
})

export type CategoryUnionType = GetCategoryAction | GetCategorySuccessAction
