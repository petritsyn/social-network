import React from "react";
import styles from './FormsControls.module.css';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = error && touched;
    return <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export function createField<FormKeysType extends string>(name: FormKeysType,
                                                         component: React.FC<WrappedFieldProps>,
                                                         type: string,
                                                         placeholder: string | undefined,
                                                         validate: Array<FieldValidatorType> | null,
                                                         text = '') {
    return <div>
        <Field name={name} component={component} type={type} placeholder={placeholder} validate={validate}/>{text}
    </div>
};