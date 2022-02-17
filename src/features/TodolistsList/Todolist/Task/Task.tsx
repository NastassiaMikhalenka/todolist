import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import {Checkbox} from "@mui/material";
import classes from "./task.module.css";



export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const callbackHandlerSpan = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const removeTask = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    return (
        <div key={props.task.id} className={classes.containerTask}>
        {/*<div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>*/}
            <Checkbox  defaultChecked
                       checked={props.task.status === TaskStatuses.Completed}
                       onChange={changeStatus}
                       sx={{
                           color: '#17A2B8',
                           '&.Mui-checked': {
                               color: '#17A2B8',
                           },
                       }}
            />
            <EditableSpan title={props.task.title} callback={callbackHandlerSpan}/>
            <IconButton
                className={classes.iconButtonDelete}
                aria-label="delete"
                        size="small"
                        onClick={removeTask}
                        >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
})