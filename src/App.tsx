import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"

function App() {
    console.log(v1())
    const title1: string = "Learn"
    const initialState = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: false}
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialState)
    // const tasks = result[0]
    // const setTasks = result[1]

    const [filter, setFilter] = useState<FilterValueType>("All")

    const removeTask = (id: string) => {
        setTasks(tasks.filter(elem => elem.id !== id))
        // let removeTaskF = tasks.filter(elem => elem.id !== id)
        // setTasks(removeTaskF)
        console.log(tasks)
    }
    const filterTask = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const addTask = (newTaskTitle: string) => {
        // const newTaskTitle: string = "New task"
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        // const copyState = [...tasks]
        // copyState.push(newTask)
        setTasks([newTask, ...tasks])
    }

    let taskForRender = tasks
    if(filter === "Active"){
        taskForRender = tasks.filter(elem => !elem.isDone)
    } if(filter === "Completed"){
        taskForRender = tasks.filter(elem => elem.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={title1}
                tasks={taskForRender}
                removeTask={removeTask}
                filterTask={filterTask}
                addTask={addTask}
            />
        </div>
    );
}


export default App;


