import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

type TodolistType = {
    title: string
    todolistId: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    filterTask: (todolistId: string, filter: FilterValueType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    filter: FilterValueType
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodoList: (todolistId: string) => void
    updateTitleTask: (todolistId: string, localTitle: string, id: string) => void
    updateTitleTodoList: (todolistId: string, localTitle: string) => void
}

export function Todolist(props: TodolistType) {
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

    const setAll = () => props.filterTask(props.todolistId, "All")
    const setActive = () => props.filterTask(props.todolistId, "Active")
    const setCompleted = () => props.filterTask(props.todolistId, "Completed")

    // const getBtnClass = (filter: FilterValueType) => {
    //     return props.filter === filter ? "outlined" : 'contained'
    // } // можно прописать здесь классы для фильтра

    // const errorMessage = error ? <div>Title is required</div> : null
    const callbackTitleTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const callbackTitleTodoListHandler = (localTitle: string) => {
        props.updateTitleTodoList(props.todolistId, localTitle)
    }


    const tasksJsx = props.tasks.map(elem => {
        const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
            return props.changeTaskStatus(props.todolistId, elem.id, e.currentTarget.checked)
        }
        const callbackHandlerSpan = (localTitle: string) => {
            props.updateTitleTask(props.todolistId, localTitle, elem.id)
        }
        return (
            <li key={elem.id} className={elem.isDone ? "is-Done" : ''}>
                <input
                    type="checkbox"
                    checked={elem.isDone}
                    onChange={changeStatus}/>
                <EditableSpan title={elem.title} callback={callbackHandlerSpan}/>
                {/*<span>{elem.title}</span>*/}
                <IconButton aria-label="delete"
                            onClick={() => props.removeTask(props.todolistId, elem.id)}>
                    <DeleteIcon/>
                </IconButton>
                {/*<button onClick={() => props.removeTask(props.todolistId, elem.id)}>X</button>*/}
            </li>
        )
    })
    return (
        <div>
            <EditableSpan title={props.title} callback={callbackTitleTodoListHandler} />
            {/*<button onClick={() => props.removeTodoList(props.todolistId)}>X</button>*/}
            <IconButton size="small" aria-label="delete"
                        onClick={() => props.removeTodoList(props.todolistId)}>
                <DeleteIcon/>
            </IconButton>
            <AddItemForm callback={callbackTitleTaskHandler}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        className={error ? "error" : ""}*/}
            {/*        value={title}*/}
            {/*        onChange={changeTitle}*/}
            {/*        onKeyPress={onKeyPress}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {errorMessage}*/}
            {/*</div>*/}
            <ul>
                {tasksJsx}
            </ul>
            <div>
                <Button variant={props.filter === "All" ? "contained" : "outlined"} size="small" color="error" onClick={setAll}>All</Button>
                <Button variant={props.filter === "Active" ? "contained" : "outlined"} size="small" color="secondary" onClick={setActive}>Active</Button>
                <Button variant={props.filter === "Completed" ? "contained" : "outlined"} size="small"  color="success" onClick={setCompleted}>Completed</Button>
                {/*<button className={getBtnClass("All")} onClick={setAll}>All</button>*/}
                {/*<button className={getBtnClass("Active")} onClick={setActive}>Active</button>*/}
                {/*<button className={getBtnClass("Completed")} onClick={setCompleted}>Completed</button>*/}
            </div>
        </div>
    );
}

