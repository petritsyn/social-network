import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/object-helpers";
import {usersType} from "../types/types";
import {appStateType} from "./redux-store";
import { Dispatch } from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<usersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //Array of users ids
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, 'id', {followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, 'id', {followed: false})
            };

        case SET_USERS:
            return {...state, users: action.users};

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count};

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };

        default:
            return state;
    }
};

type ActionsTypes = followSuccessActionType | unfollowSuccessActionType | setUsersActionType |
    setCurrentPageActionType | setTotalUsersContActionType | toggleIsFetchingActionType |
    toggleFollowingProgressActionType;

type followSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export let followSuccess = (userId: number): followSuccessActionType => ({type: FOLLOW, userId});
type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export let unfollowSuccess = (userId: number): unfollowSuccessActionType => ({type: UNFOLLOW, userId});
type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<usersType>
}
export let setUsers = (users: Array<usersType>): setUsersActionType => ({type: SET_USERS, users});
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export let setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
type setTotalUsersContActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export let setTotalUsersCount = (totalUsersCount: number): setTotalUsersContActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export let toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type toggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export let toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionsTypes>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};

export const changeUsers = (pageNumber: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.changeUsers(pageNumber);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
    }
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => followSuccessActionType | unfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSuccess);
    }
};


export default usersReducer;