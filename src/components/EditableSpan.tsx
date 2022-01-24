import React, {useState} from "react";
import TextField from '@mui/material/TextField';

type PropsType = {
    title: string
    callback: (localTitle: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    let [localTitle, setLocalTitle] = useState(props.title)
    let [edit, setEdit] = useState(false)
    console.log('EditableSpan')

    const editHandler = () => {
        setEdit(true)
        setLocalTitle(props.title)
    }
    const onBlurHandlerFALSE = () => {
        setEdit(false)
        props.callback(localTitle)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLocalTitle(e.currentTarget.value)
    }

    return (
            edit
            ? <TextField id="standard-basic" label="change task" variant="standard" size="small"
                         value={localTitle} onChange={onChangeHandler} onBlur={onBlurHandlerFALSE} autoFocus/>
                // <input value={localTitle} onChange={onChangeHandler} onBlur={onBlurHandlerFALSE} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.title}</span>
    )
})