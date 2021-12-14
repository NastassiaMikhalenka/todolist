import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    callback: (title: string) =>void
}

export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const errorMessage = error ? <div>Title is required</div> : null

    const addTask = () => {
        const newTitle = title.trim()
        if(title){
            props.callback(newTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPress}
            />
            <button onClick={addTask}>+</button>
            {errorMessage}
        </div>
    )
}