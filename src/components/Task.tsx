import React, {useCallback} from 'react';
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "../redux/reducer-tasks";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {TaskType} from "../App";

export type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const Task = React.memo(({todolistId, taskId}: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .filter(task => task.id === taskId)[0])

    const dispatch = useDispatch()

    const changeStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        return dispatch(changeStatusAC(todolistId, taskId, e.currentTarget.checked))
    }, [taskId, todolistId, dispatch])
    const callbackHandlerSpan = useCallback((localTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, localTitle, taskId))
    }, [taskId, todolistId, dispatch])
    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [taskId, todolistId, dispatch])

    return (
        <li key={taskId} className={task.isDone ? "is-Done" : ''}>
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeStatus}/>
            <EditableSpan title={task.title} callback={callbackHandlerSpan}/>
            <IconButton aria-label="delete"
                        onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})