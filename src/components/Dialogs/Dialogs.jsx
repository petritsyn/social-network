import React from "react";
import s from './Dialogs.module.css';
import DialogsItem from './DialogItem/DialogsItem';
import Message from './../Dialogs/Message/Message';
import {Field, reduxForm} from "redux-form";


const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogsItem name={d.name} id={d.id} key={d.id}/>);
    let messegesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addMessageClick = (values) => {
        props.addMessage(values.newMessageText);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messegesElements}
                <div>
                    <DialogsFormRedux onSubmit={addMessageClick}/>
                </div>
            </div>
        </div>
    )
};

const DialogsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field component='textarea' name='newMessageText' placeholder='Enter your message'/></div>
        <div><button>Add message</button></div>
    </form>
};

const DialogsFormRedux = reduxForm({form: 'dialog'})(DialogsForm);


export default Dialogs;