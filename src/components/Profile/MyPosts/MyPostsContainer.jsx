import React from 'react';
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {

  let addPost = () => {
    props.store.dispatch(addPostAC());
  };

  let onPostChange = (newText) => {
    props.store.dispatch(updateNewPostTextAC(newText));
  };

  return (
    <MyPosts posts={props.store.getState().profilePage.posts}
             onPostChange={onPostChange}
             addPost={addPost}
             newPostText={props.store.getState().profilePage.newPostText}/>)
};

export default MyPostsContainer;