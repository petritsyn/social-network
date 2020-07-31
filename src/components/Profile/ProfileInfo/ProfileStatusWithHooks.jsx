import React, {useState} from "react";


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    let activateEditMode = () => {
        setEditMode(true)
    };

    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    };

    let onStatusChange = (e) => {
        setStatus(e.target.value)
    };

    return <div>
        {!editMode &&
        <div>
            <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
        </div>
        }
        {editMode &&
        <div>
            <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}
                   value={status}/>
        </div>
        }
    </div>
};


export default ProfileStatusWithHooks;