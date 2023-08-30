import { HYDRATE } from "next-redux-wrapper";
import { USER_SETTINGS_UPDATE_LANGUAGE, USER_SETTINGS_UPDATE_ROLE, USER_SETTINGS_UPDATE_TOKEN, LOGOUT_USER } from "../../actions";

const initialState = {
    language: "en",
    postsPerPage: 4,
    role: '',
    token: '',
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.settings };
        case USER_SETTINGS_UPDATE_LANGUAGE:
            return { ...state, language: action.payload };
        case USER_SETTINGS_UPDATE_ROLE:
            return { ...state, role: action.payload };
        case USER_SETTINGS_UPDATE_TOKEN:
            return { ...state, token: action.payload };
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
};

export default reducer;