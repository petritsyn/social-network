import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = ({users, currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, unfollow, follow}) => {

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