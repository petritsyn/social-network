import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Hello!', likesCount: 15},
        {id: 2, message: 'Hi, how are you?', likesCount: 12},
        {id: 3, message: 'Second post', likesCount: 10},
        {id: 4, message: 'Its my first post.', likesCount: 11}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };

        case SET_USERS_PROFILE:
            return {...state, profile: action.profile};

        case SET_STATUS:
            return {...state, status: action.status};

        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts.filter(p => p.id != action.postId)]
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }

        default:
            return state;
    }
};


export let addPost = (newPostText) => ({type: ADD_POST, newPostText});
export let deletePost = (postId) => ({type: DELETE_POST, postId});
export let setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export let setStatus = (status) => ({type: SET_STATUS, status});
export let savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});


export const getProfile = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId);
        dispatch(setUsersProfile(data));
    }
};

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
};

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
};

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
};

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const response = await profileAPI.saveProfile(profile);
        const userId = getState().auth.userId;
        if (response.data.resultCode === 0) {
            dispatch(getProfile(userId));
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0])
        }
    }
};


export default profileReducer;