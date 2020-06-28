import React from "react";
import {Field, reduxForm} from "redux-form";


const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'login'} component={'input'} placeholder={'Login'} type={'text'}/>
        </div>
        <div>
            <Field name={'password'} component={'input'} placeholder={'Password'} type={'text'}/>
        </div>
        <div>
            <Field name={'rememberMe'} component={'input'} type={'checkbox'}/> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

let Login = (props) => {

    let onSubmit = () => {

    };

    return <div>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
};


export default Login;