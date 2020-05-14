import React from "react";
import s from './Dialogs.module.css';
import DialogsItem from './DialogItem/DialogsItem';
import Message from './../Dialogs/Message/Message';
import {addMessageAC, updateNewMessageTextAC} from "../../redux/store";

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(dialog => <DialogsItem name={dialog.name} id={dialog.id}/>);
    let messegesElements = props.state.messages.map(m => <Message message={m.message}/>);

    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.dispatch(addMessageAC());
    }

    let onMessageChange = (e) => {
        let newMessageText = e.target.value;
        props.dispatch(updateNewMessageTextAC(newMessageText));
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messegesElements}
                <div>
                    <textarea placeholder={'Enter your message'} onChange={onMessageChange} value={props.state.newMessageText}/>
                    <div>
                        <button onClick={addMessage}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;