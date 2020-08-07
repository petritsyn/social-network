import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";


const User = ({user, followingInProgress, unfollow, follow}) => {

    return <div>

         <span>
          <div>
              <NavLink to={'/profile/' + user.id}>
                <img className={styles.photo} src={user.photos.small !== null ? user.photos.small : userPhoto}/>
              </NavLink>
          </div>
          <div>{user.followed ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                  unfollow(user.id)

              }}>Unfollow</button>
              : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                  follow(user.id)

              }}>Follow</button>}</div>
          <div>
            {user.name}
          </div>
        </span>

        <span>
          <div>
            {user.status}
          </div>
          <div>
            {/*{u.location.country}*/}
          </div>
          <div>
            {/*{u.location.city}*/}
          </div>
        </span>

    </div>
};


export default User;