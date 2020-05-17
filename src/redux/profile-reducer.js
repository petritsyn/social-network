const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';


let initialState = {
  posts: [
    {id: 1, message: 'Hello!', likesCount: 15},
    {id: 2, message: 'Hi, how are you?', likesCount: 12},
    {id: 3, message: 'Second post', likesCount: 10},
    {id: 4, message: 'Its my first post.', likesCount: 11}
  ],
  newPostText: 'Hi'
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0
      };
      state.posts.push(newPost);
      state.newPostText = '';
      return state;

    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;

    default:
      return state;
  }
}


export let addPostAC = () => ({type: ADD_POST});
export let updateNewPostTextAC = (newText) => ({type: UPDATE_NEW_POST_TEXT, newText});

export default profileReducer;