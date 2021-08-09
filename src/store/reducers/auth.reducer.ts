import { AuthType, RESET_SIGNUP, SIGNUP, SIGNUP_FAIL, SIGNUP_SUCCESS } from "../actions";

export interface AuthState {
  signup: {
    loaded: boolean,
    success: boolean,
    msg: string,
  },
};

const initState: AuthState = {
  signup: {
    loaded: false,
    success: false,
    msg: '',
  }
}

export default function authReducer (state = initState, aciton: AuthType) {
  switch (aciton.type) {
    case SIGNUP:
      return {
        ...state,
        signup: {
          loaded: false,
          success: false,
        }
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          loaded: true,
          success: true,
        }
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        signup: {
          loaded: true,
          success: false,
          msg: aciton.msg,
        }
      };

    case RESET_SIGNUP:
      return {
        ...state,
        signup: {
          loaded: false,
          success: false,
          msg: '',
        }
      };

    default:
      return state;
  }
}