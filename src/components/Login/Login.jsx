import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";


const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'login'} component={Input} placeholder={'Login'} type={'text'}
                   validate={[required]}/>
        </div>
        <div>
            <Field name={'password'} component={Input} placeholder={'Password'} type={'text'}
                   validate={[required]}/>
        </div>
        <div>
            <Field name={'rememberMe'} component={Input} type={'checkbox'}/> remember me
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
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};


export default Login;