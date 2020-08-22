import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from './../../../assets/images/user.png';
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    };

    return (
        <div>
            <div className={styles.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={styles.userPhoto}/>
                <div>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                    {editMode
                        ? <ProfileDataForm profile={profile}
                                           onSubmit={onSubmit}
                                           initialValues={profile}/>
                        : <ProfileData profile={profile}
                                       isOwner={isOwner}
                                       goToEditMode={() => {
                                           setEditMode(true)
                                       }}/>
                    }
                </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <button onClick={goToEditMode}>Edit</button>}
        <div>
            <b>Full name: </b>{profile.fullName}
        </div>
        <div>
            <b>User ID: </b>{profile.userId}
        </div>
        <div>
            <b>About me: </b>{profile.aboutMe}
        </div>
        <div>
            <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My skills: </b>{profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
};

const Contact = ({contactTitle, contactValue}) => {
    return <div className={styles.contact}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
};


export default ProfileInfo;