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
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
        // setTasks(tasks.filter(elem => elem.id !== id))
        // // let removeTaskF = tasks.filter(elem => elem.id !== id)
        // // setTasks(removeTaskF)
        // console.log(tasks)
    }
    const filterTask = (todolistId: string, filter: FilterValueType) => {
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter:filter} : m))
        // setFilter(filter)
    }
    const addTask = (todolistId: string, newTaskTitle: string) => {
        const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // // const newTaskTitle: string = "New task"
        // // const copyState = [...tasks]
        // // copyState.push(newTask)
        // setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, isDone: isDone} : m)})
        // setTasks(tasks.map(elem => {
        //     if(elem.id === id){
        //         return {...elem, isDone: isDone}
        //     }
        //     return elem
        // }))
    }
    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter(f => f.id !==todolistId))
        delete tasks[todolistId]
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForRender = tasks[tl.id]
                    if(tl.filter === "Active"){
                        taskForRender = tasks[tl.id].filter(elem => !elem.isDone)
                    } if(tl.filter === "Completed"){
                        taskForRender = tasks[tl.id].filter(elem => elem.isDone)
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={taskForRender}
                            removeTask={removeTask}
                            filterTask={filterTask}
                            addTask={addTask}
                            filter={tl.filter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }

        </div>
    );
}


export default App;


