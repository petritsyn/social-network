import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'
import {createField} from "../common/FormsControls/FormsControls";
import {appStateType} from "../../redux/redux-store";


type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, captchaUrl, error}) => {
    return <form onSubmit={handleSubmit}>
        {createField<LoginFormValuesTypeKeys>('email', Input, 'Email', 'text', [required])}
        {createField<LoginFormValuesTypeKeys>('password', Input, 'Password', 'password', [required])}
        {createField<LoginFormValuesTypeKeys>('rememberMe', Input, 'checkbox', undefined, null, 'remember me')}

        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && createField<LoginFormValuesTypeKeys>('captcha', Input, 'text', 'Enter symbols', [required])}

        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (login: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

let Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    let onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
};

const mapStateToProps = (state: appStateType): MapStatePropsType  => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});


export default connect(mapStateToProps, {login})(Login);