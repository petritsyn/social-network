import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostAC, updateNewPostTextAC} from "../../../redux/store";


const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostAC());
    };

    let onPostChange = () => {
        let newText = newPostElement.current.value;
        props.dispatch(updateNewPostTextAC(newText));
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;