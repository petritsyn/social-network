let rerenderEntireTree = () => {

}

let store = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, message: 'Hello!', likesCount: 15},
        {id: 2, message: 'Hi, how are you?', likesCount: 12},
        {id: 3, message: 'Second post', likesCount: 10},
        {id: 4, message: 'Its my first post.', likesCount: 11}
      ],
      newPostText: ''
    },
    dialogsPage: {
      messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yo'},
      ],
      dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'},
      ],
      newMessageText: ''
    }
  },
  getState() {
    return this._state;
  },
  addPost(postMessage) {
    let newPost = {
      id: 5,
      message: postMessage,
      likesCount: 0
    }
    store._state.profilePage.posts.push(newPost);
    store._state.profilePage.newPostText = '';
    rerenderEntireTree(store._state);
  },
  updateNewPostText(newText) {
    store._state.profilePage.newPostText = newText;
    rerenderEntireTree(store._state);
  },
  addMessage(textMessage) {
    let newMessage = {
      id: 7,
      message: textMessage
    }
    store._state.dialogsPage.messages.push(newMessage);
    store._state.dialogsPage.newMessageText = '';
    rerenderEntireTree(store._state);
  },
  updateNewMessageText(newMessageText) {
    store._state.dialogsPage.newMessageText = newMessageText;
    rerenderEntireTree(store._state);
  },
  subscribe(observer) {
    rerenderEntireTree = observer;
  }
}


window.store = store;

export default store;