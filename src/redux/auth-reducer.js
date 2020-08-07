import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

export let setAuthUsersData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});


export const getAuthUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.me();
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUsersData(id, email, login, true));
        }
    }
};

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    }
};

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUsersData(null, null, null, false));
        }
    }
};


export default authReducer;