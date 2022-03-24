import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import classes from './AddItemForm.module.css';

type PropsType = {
    callback: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({disabled = false,...props}: PropsType) => {
    const [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.callback(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div className={classes.container}>
            <TextField disabled={disabled} id="standard-basic" label="Title" size="small"
                       variant="standard" value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler} helperText={error} error={!!error}/>
            <Button variant="contained" size="small" onClick={addItem} disabled={disabled}>+</Button>
        </div>
    )
})