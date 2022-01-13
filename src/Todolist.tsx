import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType, TodolistsType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./redux/reducer-todolist";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/reducer-tasks";

type PropsType = {
    // title: string
    todolistId: string
    // tasks: Array<TaskType>
    // removeTask: (todolistId: string, id: string) => void
    // filterTask: (todolistId: string, filter: FilterValueType) => void
    // addTask: (todolistId: string, newTaskTitle: string) => void
    // filter: FilterValueType
    // changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    // removeTodoList: (todolistId: string) => void
    // updateTitleTask: (todolistId: string, localTitle: string, id: string) => void
    // updateTitleTodoList: (todolistId: string, localTitle: string) => void
}

export function Todolist(props: PropsType) {
    // const [title, setTitle] = useState<string>("")
    // const [error, setError] = useState<boolean>(false)

    // const addTask = () => {
    //     const trimedTitle = title.trim()
    //     if(trimedTitle){
    //         props.addTask(props.todolistId, trimedTitle)
    //     } else {
    //         setError(true)
    //     }
    //     setTitle("")
    // }
    // const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    //     setTitle(e.currentTarget.value)
    //     setError(false)
    // }
    // const onKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    //     if (e.key === "Enter") {
    //         addTask();
    //     }
    // }
    let todolist = useSelector<AppRootStateType, TodolistsType>(state => state.todolists
        .filter(t => t.id === props.todolistId)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])

    const dispatch = useDispatch()

    const setAll = () => dispatch(changeFilterAC(props.todolistId, "All"))
    const setActive = () => dispatch(changeFilterAC(props.todolistId, "Active"))
    const setCompleted = () => dispatch(changeFilterAC(props.todolistId, "Completed"))
    if (todolist.filter === "Active") {
        tasks = tasks.filter(elem => !elem.isDone)
    }
    if (todolist.filter === "Completed") {
        tasks = tasks.filter(elem => elem.isDone)
    }

    const callbackAddTaskHandler = (title: string) => {
        dispatch(addTaskAC(props.todolistId, title))
    }
    const callbackTitleTodoListHandler = (localTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, localTitle))
    }


    const tasksJsx = tasks.map(elem => {
        const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
            return dispatch(changeStatusAC(props.todolistId, elem.id, e.currentTarget.checked))
        }
        const callbackHandlerSpan = (localTitle: string) => {
            dispatch(changeTaskTitleAC(props.todolistId, localTitle, elem.id))
        }
        return (
            <li key={elem.id} className={elem.isDone ? "is-Done" : ''}>
                <input
                    type="checkbox"
                    checked={elem.isDone}
                    onChange={changeStatus}/>
                <EditableSpan title={elem.title} callback={callbackHandlerSpan}/>
                <IconButton aria-label="delete"
                            onClick={() => dispatch(removeTaskAC(props.todolistId, elem.id))}>
                    <DeleteIcon/>
                </IconButton>
            </li>
        )
    })
    return (
        <div>
            <EditableSpan title={todolist.title} callback={callbackTitleTodoListHandler}/>
            <IconButton size="small" aria-label="delete"
                        onClick={() => dispatch(removeTodolistAC(props.todolistId))}>
                <DeleteIcon/>
            </IconButton>
            <AddItemForm callback={callbackAddTaskHandler}/>
            <ul>
                {tasksJsx}
            </ul>
            <div>
                <Button variant={todolist.filter === "All" ? "contained" : "outlined"} size="small" color="error"
                        onClick={setAll}>All</Button>
                <Button variant={todolist.filter === "Active" ? "contained" : "outlined"} size="small" color="secondary"
                        onClick={setActive}>Active</Button>
                <Button variant={todolist.filter === "Completed" ? "contained" : "outlined"} size="small"
                        color="success" onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    );
}

