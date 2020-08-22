import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import styles from './ProfileInfo.module.css';
import style from "../../common/FormsControls/FormsControls.module.css";


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <button>Save</button>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name: </b>{createField('fullName', Input, 'text', 'Full name', [])}
        </div>
        <div>
            <b>Looking for a job: </b>{createField('lookingForAJob', Input, 'checkbox', null, null)}
        </div>
        <div>
            <b>My skills: </b>{createField('lookingForAJobDescription', Textarea, null, 'My profissional skills', [])}
        </div>
        <div>
            <b>About me: </b>{createField('aboutMe', Textarea, null, 'About me', [])}
        </div>
        <div>
            <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
            return <div key={key} className={styles.contact}>
                <b>{key}: </b>{createField('contacts.' + key, Input, 'text', key, [])}
            </div>
        })}
        </div>
    </form>
};

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;