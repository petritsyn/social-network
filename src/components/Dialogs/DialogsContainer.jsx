import React from "react";
import {addMessage, updateNewMessageText} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
};

let withRedirect = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, {addMessage, updateNewMessageText})(withRedirect);


export default DialogsContainer;