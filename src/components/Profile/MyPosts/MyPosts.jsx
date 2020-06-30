import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";


const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);

    let addPostClick = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <MyPostsFormRedux onSubmit={addPostClick}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

const MyPostsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field component='textarea' name='newPostText'/></div>
        <div>
            <button>Add post</button>
        </div>
    </form>
};

const MyPostsFormRedux = reduxForm({form: 'posts'})(MyPostsForm);


export default MyPosts;