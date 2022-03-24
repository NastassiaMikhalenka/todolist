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

export const Task = React.memo(({task, todolistId, changeTaskTitle, removeTask, changeTaskStatus}: TaskPropsType) => {
    const taskId = task.id
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [taskId, todolistId, changeTaskStatus]);

    const callbackHandlerSpan = useCallback((newValue: string) => {
        changeTaskTitle(taskId, newValue, todolistId)
    }, [taskId, todolistId, changeTaskTitle]);

    const removeTaskHandler = useCallback(() => removeTask(taskId, todolistId), [taskId, todolistId, removeTask]);

    return (
        <div key={taskId} className={classes.containerTask}>
            <div>
                <Checkbox checked={task.status === TaskStatuses.Completed}
                          onChange={changeStatus}
                />
                <EditableSpan title={task.title} callback={callbackHandlerSpan}/>
            </div>
            <IconButton
                className={classes.iconButtonDelete}
                aria-label="delete"
                size="small"
                onClick={removeTaskHandler}
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
})