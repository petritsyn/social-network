import React from "react";
import s from './Dialogs.module.css';
import DialogsItem from './DialogItem/DialogsItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

  let dialogsElements = props.state.dialogs.map(dialog => <DialogsItem name={dialog.name} id={dialog.id}/>);
  let messegesElements = props.state.messages.map(m => <Message message={m.message}/>);

  let newMessageElement = React.createRef();

  let addMessage = () => {
    let text = newMessageElement.current.value;
    props.addMessage(text);
  }

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessageText(text);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messegesElements}
        <div>
          <textarea ref={newMessageElement} onChange={onMessageChange} value={props.newMessageText} />
          <div>
            <button onClick={addMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs;