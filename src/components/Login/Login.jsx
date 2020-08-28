import React from "react";
import {reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'
import {createField} from "../common/FormsControls/FormsControls";


const LoginForm = ({handleSubmit, captchaUrl, error}) => {
    return <form onSubmit={handleSubmit}>
        {createField('email', Input, 'Email', 'text', [required])}
        {createField('password', Input, 'Password', 'password', [required])}
        {createField('rememberMe', Input, 'checkbox', null, null, 'remember me')}

        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && createField('captcha', Input, 'text', 'Enter symbols', [required])}

        {error && <div className={style.formSummaryError}>
            {error}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});


export default connect(mapStateToProps, {login})(Login);