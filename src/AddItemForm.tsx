import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callback: (title: string) =>void
}

export const AddItemForm = React.memo((props: PropsType) => {
    const [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)
    // const errorMessage = error ? <div>Title is required</div> : null
    console.log('AddItemForm')

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
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label="Title"
                       helperText={error}
            />
            <Button variant="contained" size="small" onClick={addItem}>+</Button>
        </div>
    )
})