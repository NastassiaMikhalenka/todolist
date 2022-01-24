import React, {useCallback} from "react";
import {TaskType, TodolistsType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./redux/reducer-todolist";
import {addTaskAC} from "./redux/reducer-tasks";
import {Task} from "./components/Task";

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

    const setAll = useCallback(() => dispatch(changeFilterAC(props.todolistId, "All")), [props.todolistId, dispatch])
    const setActive = useCallback(() => dispatch(changeFilterAC(props.todolistId, "Active")), [props.todolistId, dispatch])
    const setCompleted = useCallback(() => dispatch(changeFilterAC(props.todolistId, "Completed")), [props.todolistId, dispatch])

    let tasksForTodolist = tasks
    if (todolist.filter === "Active") {
        tasksForTodolist = tasksForTodolist.filter(elem => !elem.isDone)
    }
    if (todolist.filter === "Completed") {
        tasksForTodolist = tasksForTodolist.filter(elem => elem.isDone)
    }

    const callbackAddTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistId, title))
    }, [props.todolistId, dispatch])

    const callbackTitleTodoListHandler = useCallback((localTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, localTitle))
    }, [props.todolistId, dispatch])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.todolistId))
    }, [props.todolistId, dispatch])

    return (
        <div>
            <EditableSpan title={todolist.title} callback={callbackTitleTodoListHandler}/>
            <IconButton size="small" aria-label="delete"
                        onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
            <AddItemForm callback={callbackAddTaskHandler}/>
            <ul>
                {tasksForTodolist.map(elem => {
                    return <Task
                        key={elem.id}
                        todolistId={props.todolistId}
                        taskId={elem.id}
                    />
                })
                }
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

