import React, {useState} from "react";
import TextField from '@mui/material/TextField';

type PropsType = {
    title: string
    callback: (localTitle: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    let [title, setTitle] = useState(props.title)
    let [edit, setEdit] = useState(false)
    console.log('EditableSpan')

    const editHandler = () => {
        setEdit(true)
        setTitle(props.title)
    }
    const onBlurHandlerFALSE = () => {
        setEdit(false)
        props.callback(title)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }

    return (
            edit
                ? <TextField
                    id="standard-required"
                    variant="standard"
                    value={title} onChange={onChangeHandler} onBlur={onBlurHandlerFALSE} autoFocus
                />
            : <span onDoubleClick={editHandler}>{props.title}</span>
    )
})