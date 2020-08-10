import SESSION_ACTION_TYPE from './sessionTypes';

const INITIAL_STATE = {
  currentUser: {},
  ideas: [],
  loading: false,
  error: '',
  successMessage: '',
  loggedIn: false,
};

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...action.payload },
        loading: false,
      };
    case SESSION_ACTION_TYPE.LOGOUT:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        ideas: [],
        currentUser: {},
      };
    case SESSION_ACTION_TYPE.LOGIN:
      return {
        ...state,
        loading: false,
        loggedIn: true,
      };
    case SESSION_ACTION_TYPE.SET_IDEAS:
      return {
        ...state,
        ideas: action.payload,
        loading: false,
        successMessage: '',
      };
    case SESSION_ACTION_TYPE.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case SESSION_ACTION_TYPE.LOADING_END:
      return {
        ...state,
        loading: false,
      };
    case SESSION_ACTION_TYPE.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
        loading: false,
      };
    case SESSION_ACTION_TYPE.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default sessionReducer;
