import React from "react";
import s from './Dialogs.module.css';
import DialogsItem from './DialogItem/DialogsItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(dialog => <DialogsItem name={dialog.name} id={dialog.id}/>);
    let messegesElements = props.messages.map(m => <Message message={m.message}/>);

    let addMessage = () => {
        props.addMessage();
    }

    let onMessageChange = (e) => {
        let newMessageText = e.target.value;
        props.onMessageChange(newMessageText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messegesElements}
                <div>
                    <textarea placeholder={'Enter your message'} onChange={onMessageChange} value={props.newMessageText}/>
                    <div>
                        <button onClick={addMessage}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;