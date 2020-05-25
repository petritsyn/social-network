import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>

        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage} onClick={(e) => {
                    props.onPageChanged(p)
                }}>{p}</span>
            })}
        </div>

        {
            props.users.map(u => <div key={u.id}>
        <span>
          <div>
            <img className={styles.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
          </div>
          <div>{u.followed ? <button onClick={() => {
              props.unfollow(u.id)
          }}>Unfollow</button> : <button onClick={() => {
              props.follow(u.id)
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
}


export default Users;