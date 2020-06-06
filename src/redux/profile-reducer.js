import {profileAPI} from "../api/api";
const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';


let initialState = {
    posts: [
        {id: 1, message: 'Hello!', likesCount: 15},
        {id: 2, message: 'Hi, how are you?', likesCount: 12},
        {id: 3, message: 'Second post', likesCount: 10},
        {id: 4, message: 'Its my first post.', likesCount: 11}
    ],
    newPostText: 'Hi',
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };

      case SET_USERS_PROFILE:
        return {...state, profile: action.profile};

        default:
            return state;
    }
};


export let addPostAC = () => ({type: ADD_POST});
export let setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export let updateNewPostTextAC = (newText) => ({type: UPDATE_NEW_POST_TEXT, newText});


export const getProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId).then(data => {
            dispatch(setUsersProfile(data));
        });
    }
};


export default profileReducer;