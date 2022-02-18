import React, {useCallback, useEffect} from "react";

import '../../../app/App.css';
import {AddItemForm} from "../../../components/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../../../redux/reducer-todolist";
import {fetchTasksTC} from "../../../redux/reducer-tasks";

type PropsType = {
    todolist: TodolistDomainType
    // id: string
    // title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    // filter: FilterValuesType
    demo?: boolean
}

export function Todolist({demo = false, ...props}: PropsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))

    }, [])

    const setAll = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    const setActive = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    const setCompleted = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const callbackAddTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const callbackTitleTodoListHandler = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }

    return (
        <div>
            <EditableSpan title={props.todolist.title} callback={callbackTitleTodoListHandler}/>
            <IconButton size="small" aria-label="delete"
                        onClick={removeTodolist}
                        disabled={props.todolist.entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
            <AddItemForm callback={callbackAddTaskHandler}
                         disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {tasksForTodolist?.map(elem => {
                    return <Task
                        key={elem.id} task={elem} todolistId={props.todolist.id}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                    />
                })
                }
            </div>
            <div>
                <Button variant={props.todolist.filter === "all" ? "contained" : "outlined"} size="small" color="error"
                        onClick={setAll}>All</Button>
                <Button variant={props.todolist.filter === "active" ? "contained" : "outlined"} size="small"
                        color="secondary"
                        onClick={setActive}>Active</Button>
                <Button variant={props.todolist.filter === "completed" ? "contained" : "outlined"} size="small"
                        color="success" onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    );
}

