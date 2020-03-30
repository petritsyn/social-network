let state = {
  profilePage: {
    posts: [
      {id: 1, message: 'Hello!', likesCount: 15},
      {id: 2, message: 'Hi, how are you?', likesCount: 12},
      {id: 3, message: 'Second post', likesCount: 10},
      {id: 4, message: 'Its my first post.', likesCount: 11}
    ]
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
    ]
  }
};

export default state;