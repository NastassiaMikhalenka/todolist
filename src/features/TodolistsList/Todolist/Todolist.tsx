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
import {FilterValuesType} from "../../../redux/reducer-todolist";
import {fetchTasksTC} from "../../../redux/reducer-tasks";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const setAll = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])
    const setActive = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])
    const setCompleted = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const callbackAddTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const callbackTitleTodoListHandler = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <EditableSpan title={props.title} callback={callbackTitleTodoListHandler}/>
            <IconButton size="small" aria-label="delete"
                        onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
            <AddItemForm callback={callbackAddTaskHandler}/>
            <div>
                {tasksForTodolist?.map(elem => {
                    return <Task
                        key={elem.id} task={elem} todolistId={props.id}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                    />
                })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"} size="small" color="error"
                        onClick={setAll}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"} size="small" color="secondary"
                        onClick={setActive}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"} size="small"
                        color="success" onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    );
}

