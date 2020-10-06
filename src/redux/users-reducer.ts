import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/object-helpers";
import {usersType} from "../types/types";
import {appStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, 'id', {followed: true})
            };

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, 'id', {followed: false})
            };

        case 'SET_USERS':
            return {...state, users: action.users};

        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};

        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count};

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching};

        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };

        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<usersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionsTypes>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
};

export const changeUsers = (pageNumber: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.changeUsers(pageNumber);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
    }
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow, actions.followSuccess);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow, actions.unfollowSuccess);
    }
};


export default usersReducer;