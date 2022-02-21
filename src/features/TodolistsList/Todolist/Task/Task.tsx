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

export const Task = React.memo(({task, todolistId, changeTaskTitle, ...props}: TaskPropsType) => {

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);

    const callbackHandlerSpan = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [task.id, todolistId]);

    const removeTask = useCallback(() => props.removeTask(task.id, todolistId), [task.id, todolistId]);

    return (
        <div key={task.id} className={classes.containerTask}>
        {/*<div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>*/}
            <Checkbox  defaultChecked
                       checked={task.status === TaskStatuses.Completed}
                       onChange={changeStatus}
                       sx={{
                           color: '#17A2B8',
                           '&.Mui-checked': {
                               color: '#17A2B8',
                           },
                       }}
            />
            <EditableSpan title={task.title} callback={callbackHandlerSpan}/>
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