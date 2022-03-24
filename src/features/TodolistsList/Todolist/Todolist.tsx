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
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export function Todolist({
                             demo = false,
                             todolist,
                             tasks,
                             addTask,
                             changeFilter,
                             changeTodolistTitle,
                             ...props
                         }: PropsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        // if (demo) {
        //     return
        // }
        dispatch(fetchTasksTC(todolist.id))

    }, [dispatch, todolist.id])

    const setAll = useCallback(() => changeFilter('all', todolist.id), [todolist.id, changeFilter])
    const setActive = useCallback(() => changeFilter('active', todolist.id), [todolist.id, changeFilter])
    const setCompleted = useCallback(() => changeFilter('completed', todolist.id), [todolist.id, changeFilter])

    let tasksForTodolist = tasks
    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const callbackAddTaskHandler = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask, todolist.id])

    const callbackTitleTodoListHandler = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title)
    }, [todolist.id, changeTodolistTitle])

    const removeTodolist = () => {
        props.removeTodolist(todolist.id)
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <EditableSpan title={todolist.title} callback={callbackTitleTodoListHandler}/>
                <IconButton size="small" aria-label="delete"
                            onClick={removeTodolist}
                            disabled={todolist.entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm callback={callbackAddTaskHandler}
                         disabled={todolist.entityStatus === 'loading'}/>
            <div style={{minHeight: '20px'}}>
                {tasksForTodolist?.map(elem => {
                    return <Task
                        key={elem.id} task={elem} todolistId={todolist.id}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                    />
                })
                }
            </div>
            {
                tasks.length > 0
                    ? <div>
                        <Button variant={todolist.filter === "all" ? "contained" : "outlined"} size="small"
                                onClick={setAll}>All</Button>
                        <Button variant={todolist.filter === "active" ? "contained" : "outlined"} size="small"
                                onClick={setActive}>Active</Button>
                        <Button variant={todolist.filter === "completed" ? "contained" : "outlined"} size="small"
                                onClick={setCompleted}>Completed</Button>
                    </div>
                    : <></>
            }
        </div>
    );
}

