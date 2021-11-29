import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";
import './App.css';

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTask: (filter: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
    filter: FilterValueType
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: TodolistType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimedTitle = title.trim()
        if(trimedTitle){
            props.addTask(trimedTitle)
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

    const setAll = () => props.filterTask("All")
    const setActive = () => props.filterTask("Active")
    const setCompleted = () => props.filterTask("Completed")

    const getBtnClass = (filter: FilterValueType) => {
        return props.filter === filter ? "activeFilterBtn" : ''
    }

    const errorMessage = error ? <div>Title is required</div> : null


    const tasksJsx = props.tasks.map(elem => {
        const changeStatus = (e: React.ChangeEvent<HTMLInputElement> ) => {
            return props.changeTaskStatus(elem.id, e.currentTarget.checked)
        }
        return (
            <li key={elem.id} className={elem.isDone ? "is-Done" : ''}>
                <input
                    type="checkbox"
                    checked={elem.isDone}
                    onChange={changeStatus}/>
                <span>{elem.title}</span>
                <button onClick={() => props.removeTask(elem.id)}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
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
            <ul>
                {tasksJsx}
            </ul>
            <div>
                <button
                    className={getBtnClass("All")}
                    onClick={setAll}>All</button>
                <button
                    className={getBtnClass("Active")}
                    onClick={setActive}>Active</button>
                <button
                    className={getBtnClass("Completed")}
                    onClick={setCompleted}>Completed</button>
            </div>
        </div>
    );
}

