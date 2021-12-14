import React, {useState} from "react";

type PropsType = {
    title: string
    callback: (localTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    let [localTitle, setLocalTitle] = useState(props.title)
    let [edit, setEdit] = useState(false)

    const editHandler = () => {
        setEdit(true)
    }
    const onBlurHandlerFALSE = () => {
        setEdit(false)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLocalTitle(e.currentTarget.value)
    }

    return (
            edit
            ? <input value={localTitle} onChange={onChangeHandler} onBlur={onBlurHandlerFALSE} autoFocus/>
            : <span onDoubleClick={editHandler}>{localTitle}</span>
    )
}