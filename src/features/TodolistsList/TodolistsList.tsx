import React, {useCallback, useEffect} from 'react';
import {
    addTodoTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType,
    removeTodoTC,
    setTodosTC,
    TodolistDomainType
} from "../../redux/reducer-todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../redux/reducer-tasks";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: PropsType) => {
    useEffect(() => {
        if (demo) {
            return
        }
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
        dispatch(updateTaskTC(todolistId, id, {status}));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodoTC(id));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
        // const action = changeTaskTitleAC(id, newTitle, todolistId);
        // dispatch(changeTaskTitleAC(id, title, todolistId));
        dispatch(updateTaskTC(todolistId, id, {title}));

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
        <>
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
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}