import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callback: (title: string) =>void
}

export const AddItemForm = React.memo((props: PropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    // const errorMessage = error ? <div>Title is required</div> : null
    console.log('AddItemForm')

    const addTask = () => {
        if (title.trim() !== "") {
            props.callback(title);
            setTitle("");
        } else {
            setError(true)
        }
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
            {/*<input*/}
            {/*    className={error ? "error" : ""}*/}
            {/*    value={title}*/}
            {/*    onChange={changeTitle}*/}
            {/*    onKeyPress={onKeyPress}*/}
            {/*/>*/}
            <TextField id="outlined-basic" label={error ? "Title is required" : "Enter new task name"} variant="outlined"
                       className={error ? "error" : ""}
                       value={title}
                       error={!!error}
                       size="small"
                       onChange={changeTitle}
                       onKeyPress={onKeyPress}/>
            {/*<button onClick={addTask}>+</button>*/}
            <Button variant="contained" size="small" onClick={addTask}>+</Button>
            {/*{errorMessage}*/}
        </div>
    )
})