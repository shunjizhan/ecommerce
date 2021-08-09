import { AuthType, SIGNUP, SIGNUP_FAIL, SIGNUP_SUCCESS } from "../actions";

export interface AuthState {
  signup: {
    loaded: boolean,
    success: boolean,
  },
};

const initState: AuthState = {
  signup: {
    loaded: false,
    success: false,
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

    default:
      return state;
  }
}