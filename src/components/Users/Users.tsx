import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {usersType} from "../../types/types";


type propsType = {
    users: Array<usersType>
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<propsType> = ({users, currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, unfollow, follow}) => {

    return <div>

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}
                   pageSize={pageSize}/>

        {
            users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} unfollow={unfollow}
                                 follow={follow}/>)
        }
    </div>
};


export default Users;