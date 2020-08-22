import React from "react";
import styles from './FormsControls.module.css';
import {Field} from "redux-form";


const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = error && touched;
    return <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

/*
export const createField = (name, component, placeholder, type, validate, props={}, text = '') => {
    return <div>
        <Field name={name} component={component} placeholder={placeholder} validate={validate} {...props} />{text}
    </div>
};*/

export const createField = (name, component, type, placeholder, validate, text = '') => {
    return <div>
        <Field name={name} component={component} type={type}  placeholder={placeholder} validate={validate} />{text}
    </div>
};