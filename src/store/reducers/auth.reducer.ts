import { AuthType, RESET_SIGNUP, SIGNIN, SIGNIN_FAIL, SIGNIN_SUCCESS, SIGNUP, SIGNUP_FAIL, SIGNUP_SUCCESS } from "../actions";

export interface AuthState {
  signup: {
    loaded: boolean,
    success: boolean,
    msg: string,
  },
  signin: {
    loaded: boolean,
    success: boolean,
    msg: string,
  }
};

const initState: AuthState = {
  signup: {
    loaded: false,
    success: false,
    msg: '',
  },
  signin: {
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

    case SIGNIN:
      return {
        ...state,
        signin: {
          loaded: false,
          success: false,
        }
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        signin: {
          loaded: true,
          success: true,
        }
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        signin: {
          loaded: true,
          success: false,
          msg: aciton.msg,
        }
      };

    default:
      return state;
  }
}