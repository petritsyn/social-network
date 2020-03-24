import React from 'react';
import classes from './Post.module.css';

const Post = () => {
  return (
        <div className={classes.item}>
          <img src="https://avatars.mds.yandex.net/get-pdb/1979423/4f56fe36-7a8d-4805-bde3-039bd14a6b7f/s1200?webp=false"/>
          post 1
          <div>
            <span>Like</span>
          </div>
        </div>
)
};

export default Post;