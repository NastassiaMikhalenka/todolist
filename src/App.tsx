import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./redux/reducer-todolist";
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./redux/reducer-tasks";

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
    let todolistID1 = v1();
    let todolistID2 = v1();

    const [stateTodolists, dispatchTodolists] = useReducer(TodolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    const [stateTasks, dispatchTasks] = useReducer(TaskReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })
    const removeTask = (todolistId: string, id: string) => {
        dispatchTasks(removeTaskAC(todolistId, id))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
        // setTasks(tasks.filter(elem => elem.id !== id))
        // // let removeTaskF = tasks.filter(elem => elem.id !== id)
        // // setTasks(removeTaskF)
        // console.log(tasks)
    }
    const filterTask = (todolistId: string, filter: FilterValueType) => {
        dispatchTodolists(changeFilterAC(todolistId, filter))
        // setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter:filter} : m))
        // setFilter(filter)
    }
    const addTask = (todolistId: string, newTaskTitle: string) => {
        dispatchTasks(addTaskAC(todolistId, newTaskTitle))
        // const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // // const newTaskTitle: string = "New task"
        // // const copyState = [...tasks]
        // // copyState.push(newTask)
        // setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatchTasks(changeStatusAC(todolistId, id, isDone))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, isDone: isDone} : m)})
        // setTasks(tasks.map(elem => {
        //     if(elem.id === id){
        //         return {...elem, isDone: isDone}
        //     }
        //     return elem
        // }))
    }
    const removeTodoList = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasks(removeTodolistAC(todolistId))
        // setTodolists(todolists.filter(f => f.id !==todolistId))
        // delete tasks[todolistId]
    }
    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchTasks(action)
        // let newTodoList: TodolistsType =  {id: newTodoListID, title: newTitle, filter: 'All'}
        // setTodolists([newTodoList, ...todolists])
        // setTasks({...tasks, [newTodoList.id]: []})
    }
    const updateTitleTask = (todolistId: string, localTitle: string, id: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId, localTitle, id))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, title: localTitle} : m)})
    }

    const updateTitleTodoList = (todolistId: string, localTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, localTitle))
        // setTodolists(todolists.map(m => m.id === todolistId ? {...m, title: localTitle} : m))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {stateTodolists.map(tl => {
                        let taskForRender = stateTasks[tl.id]
                        if (tl.filter === "Active") {
                            taskForRender = stateTasks[tl.id].filter(elem => !elem.isDone)
                        }
                        if (tl.filter === "Completed") {
                            taskForRender = stateTasks[tl.id].filter(elem => elem.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
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
                                        updateTitleTask={updateTitleTask}
                                        updateTitleTodoList={updateTitleTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;


