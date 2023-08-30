import { LOGOUT_USER, USER_SETTINGS_UPDATE_LANGUAGE, USER_SETTINGS_UPDATE_ROLE, USER_SETTINGS_UPDATE_TOKEN } from "../";

export const settingsUpdateLang = (lang: any) => ({
  type: USER_SETTINGS_UPDATE_LANGUAGE,
  payload: lang,
});

export const settingsUpdateRole = (role: any) => ({
  type: USER_SETTINGS_UPDATE_ROLE,
  payload: role,
});

export const settingsUpdateToken = (token: any) => ({
  type: USER_SETTINGS_UPDATE_TOKEN,
  payload: token,
});

export const resetUser = () => ({
  type: LOGOUT_USER,
});