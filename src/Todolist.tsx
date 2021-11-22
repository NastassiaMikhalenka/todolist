import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTask: (filter: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
}

export function Todolist(props: TodolistType) {
    const [title, setTitle] = useState<string>("")
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    const setAll = () => props.filterTask("All")
    const setActive = () => props.filterTask("Active")
    const setCompleted = () => props.filterTask("Completed")

    const tasksJsx = props.tasks.map(elem => {
        return (
            <li key={elem.id}><input type="checkbox" checked={elem.isDone}/>
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
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPress}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJsx}
            </ul>
            <div>
                <button onClick={setAll}>All</button>
                <button onClick={setActive}>Active</button>
                <button onClick={setCompleted}>Completed</button>
            </div>
        </div>
    );
}

