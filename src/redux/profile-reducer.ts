import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../types/types";

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
    ] as Array<postType>,
    profile: null as profileType | null,
    status: ''
};
type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
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
                profile: {...state.profile, photos: action.photos} as profileType
            }
        }

        default:
            return state;
    }
};

type addPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export let addPost = (newPostText: string): addPostActionType => ({type: ADD_POST, newPostText});
type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export let deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId});
type setUsersProfileActionType = {
    type: typeof SET_USERS_PROFILE
    profile: profileType
}
export let setUsersProfile = (profile: profileType): setUsersProfileActionType => ({type: SET_USERS_PROFILE, profile});
type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export let setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status});
type setPhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: photosType
}
export let savePhotoSuccess = (photos: photosType): setPhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});


export const getProfile = (userId: number) => {
    return async (dispatch: any) => {
        let data = await profileAPI.getProfile(userId);
        dispatch(setUsersProfile(data));
    }
};

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
};

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
};

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
};

export const saveProfile = (profile: profileType) => {
    return async (dispatch: any, getState: any) => {
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