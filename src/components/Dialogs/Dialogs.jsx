import React from "react";
import s from './Dialogs.module.css';
import DialogsItem from './DialogItem/DialogsItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

  let dialogs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrew'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Victor'},
    {id: 6, name: 'Valera'},
  ];

  let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Hello'},
    {id: 3, message: 'How are you?'},
    {id: 4, message: 'Yo'},
    {id: 5, message: 'Yo'},
    {id: 6, message: 'Yo'},
  ];

  let dialogsElements = dialogs.map(dialog => <DialogsItem name={dialog.name} id={dialog.id}/>);
  let messegesElements = messages.map(m => <Message message={m.message}/>);

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messegesElements}
      </div>
    </div>
  )
}

export default Dialogs;