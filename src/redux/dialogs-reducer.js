const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: 7,
        message: state.newMessageText
      }
      state.messages.push(newMessage);
      state.newMessageText = '';
      return state;

    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.newMessageText;
      return state;

    default:
      return state;
  }
}

export let addMessageAC = () => ({type: ADD_MESSAGE});
export let updateNewMessageTextAC = (newMessageText) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText});


export default dialogsReducer;