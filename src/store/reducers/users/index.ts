import { HYDRATE } from "next-redux-wrapper";
import { USER_UPDATE, USER_RESET, LOGOUT_USER } from "../../actions";

const initialState = {
  userId: null,
  username: null,
  email: null,
  photo: null,
  first_name: null,
  last_name: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user };
    case USER_UPDATE:
      return { ...state, ...action.payload };
    case USER_RESET:
      return initialState;
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;