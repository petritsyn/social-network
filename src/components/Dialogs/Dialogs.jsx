import React from "react";
import s from './Dialogs.module.css';
import DialogsItem from './DialogItem/DialogsItem';
import Message from './../Dialogs/Message/Message';
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogsItem name={d.name} id={d.id} key={d.id}/>);
    let messegesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addMessage = () => {
        props.addMessage();
    };

    let onMessageChange = (e) => {
        let newMessageText = e.target.value;
        props.onMessageChange(newMessageText);
    };

    if(!props.isAuth) {return <Redirect to={'/login'} />}

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
};

export default Dialogs;