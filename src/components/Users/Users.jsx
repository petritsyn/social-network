import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>

        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage} key={p.id} onClick={(e) => {
                    props.onPageChanged(p)
                }}>{p}</span>
            })}
        </div>

        {
            props.users.map(u => <div key={u.id}>
        <span>
          <div>
              <NavLink to={'/profile/' + u.id}>
                <img className={styles.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
              </NavLink>
          </div>
          <div>{u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
              props.toggleFollowingProgress(true, u.id);
              usersAPI.unfollow(u.id)
                  .then(data => {
                      if (data.resultCode === 0) {
                          props.unfollow(u.id)
                      }
                      props.toggleFollowingProgress(false, u.id);
                  });

          }}>Unfollow</button> : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
              props.toggleFollowingProgress(true, u.id);
              usersAPI.follow(u.id)
                  .then(data => {
                      if (data.resultCode === 0) {
                          props.follow(u.id)
                      }
                      props.toggleFollowingProgress(false, u.id);
                  });

          }}>Follow</button>}</div>
          <div>
            {u.name}
          </div>
        </span>
                <span>
          <div>
            {u.status}
          </div>
          <div>
            {/*{u.location.country}*/}
          </div>
          <div>
            {/*{u.location.city}*/}
          </div>
        </span>
            </div>)
        }
    </div>
};


export default Users;