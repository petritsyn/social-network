import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

type payloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type setAuthUsersDataActionType = {
    type: typeof SET_USER_DATA
    payload: payloadType
}
export let setAuthUsersData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUsersDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export let getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

export const getAuthUserData = () => {
    return async (dispatch: any) => {
        let data = await authAPI.me();
        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = data.data;
            dispatch(setAuthUsersData(id, email, login, true));
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        let data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.Captcha) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    }
};

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUsersData(null, null, null, false));
        }
    }
};

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;

        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
};


export default authReducer;