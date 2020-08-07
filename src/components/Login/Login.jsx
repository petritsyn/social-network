import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'
import {createField} from "../common/FormsControls/FormsControls";


const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField('email', Input, 'Email', 'text', [required])}
        {createField('password', Input, 'Password', 'password', [required])}
        {createField('rememberMe', Input, null, 'checkbox', null, 'remember me')}

        {props.error && <div className={style.formSummaryError}>
            {props.error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

let Login = (props) => {

    let onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, {login})(Login);