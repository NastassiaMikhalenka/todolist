import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoTC,
    changeTodolistFilterAC, changeTodolistTitleAC, changeTodolistTitleTC,
    FilterValuesType, removeTodoTC,
    setTodosTC,
    TodolistDomainType
} from "./redux/reducer-todolist";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {addTaskTC, changeTaskTitleAC, removeTaskTC, updateTaskStatusTC} from "./redux/reducer-tasks";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    useEffect(() => {
        dispatch(setTodosTC())
    }, [])

    const stateTodolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, id));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title));
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        // const action = changeTaskStatusAC(id, status, todolistId);
        dispatch(updateTaskStatusTC(todolistId, id, status));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodoTC(id));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
        // const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(changeTaskTitleAC(id, title, todolistId));

    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        // const action = changeTodolistTitleAC(id, title);
        // dispatch(action);
        dispatch(changeTodolistTitleTC(id, title))
    }, []);


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoTC(title));
    }, [dispatch]);

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {stateTodolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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


