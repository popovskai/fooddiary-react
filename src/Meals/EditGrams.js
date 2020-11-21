import React, {useState, useEffect} from "react";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const EditGrams = props => {
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState(props.initialValue);
    const [sentId, setId] = useState(props.idSent);
    const pencil = <FontAwesomeIcon icon={faPencilAlt} />



    const saveButtonClicked = () => {
        setEditMode(false);

        props.onSaveButtonClicked(editValue, sentId);
    };

    return (
        <span>
            {
                editMode === true ?
                    (
                        <span>
                            <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)} />
                            <button type="button" className="btn btn-primary btn-sm" onClick={saveButtonClicked}>Save</button>
                        </span>
                    )
                    :
                    (
                        <span>
                            {editValue}g
                            <a href="#" onClick={() => setEditMode(true)}>{pencil}</a>
                        </span>
                    )
            }
        </span>
    );
};

export default EditGrams;