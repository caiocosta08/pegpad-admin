import { USER_UPDATE, USER_RESET, LOGOUT_USER } from "../";

export const userUpdate = (user: any) => ({
  type: USER_UPDATE,
  payload: user,
});

export const userReset = () => {
  return {
    type: USER_RESET,
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});