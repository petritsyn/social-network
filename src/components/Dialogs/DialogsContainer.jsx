import React from "react";
import {addMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    let addMessage = () => {
        props.store.dispatch(addMessageAC());
    }

    let onMessageChange = (newMessageText) => {
        props.store.dispatch(updateNewMessageTextAC(newMessageText));
    }

    return (
      <Dialogs dialogs={props.store.getState().dialogsPage.dialogs}
               messages={props.store.getState().dialogsPage.messages}
               addMessage={addMessage}
               onMessageChange={onMessageChange}
               newMessageText={props.store.getState().dialogsPage.newMessageText} />
    )

}

export default DialogsContainer;