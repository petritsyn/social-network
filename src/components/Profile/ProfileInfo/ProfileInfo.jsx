import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {

  if(!props.profile) {
    return <Preloader/>
  }

    return (
        <div>
            <div className={s.mainPage}>
                <img src="https://www.w3schools.com/howto/img_snow_wide.jpg"/>
            </div>
            <div className={s.descriptionBlock}>
              <img src={props.profile.photos.large}/>
                ava + description
            </div>
        </div>
    )
};

export default ProfileInfo;