const ADD_MESSAGE = 'ADD_MESSAGE';


type dialogType = {
    id: number
    message: string
}
type messageType = {
    id: number
    name: string
}

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yo'},
    ] as Array<dialogType>,
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'},
    ] as Array<messageType>
};
type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 7,
                message: action.newMessageText
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };

        default:
            return state;
    }
};

type addMessageActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}
export let addMessage = (newMessageText: string): addMessageActionType => ({type: ADD_MESSAGE, newMessageText});


export default dialogsReducer;