import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionsType =
    removeTaskACType
    | addTaskACType
    | changeStatusACType
    | changeTaskTitleACType
    | removeAllTasksACType
    | addArrayTasksACType

export const TaskReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)
            }
        }
        case "ADD_TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.newTaskTitle,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE_STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {
                    ...m,
                    isDone: action.payload.isDone
                } : m)
            }
        }
        case "CHANGE_TASK_TITLE": {
            return {
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.todolistId ? {
                    ...m,
                    title: action.payload.localTitle
                } : m),
                ...state
            }
        }
        case "REMOVE_ALL_TASKS": {
            let copyTasks = {...state}
            delete copyTasks[action.payload.todolistId]
            return copyTasks
        }
        case "ADD_ARRAY_TASKS": {
            return {
                ...state,
                [action.payload.newTodolistId]: []
            }
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            todolistId: todolistId,
            id: id
        },
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: "ADD_TASK",
        payload: {
            todolistId: todolistId,
            newTaskTitle: newTaskTitle
        },
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: "CHANGE_STATUS",
        payload: {
            todolistId: todolistId,
            id: id,
            isDone: isDone
        },
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, localTitle: string, todolistId: string) => {
    return {
        type: "CHANGE_TASK_TITLE",
        payload: {
            id: id,
            localTitle: localTitle,
            todolistId: todolistId
        },
    } as const
}

type removeAllTasksACType = ReturnType<typeof removeAllTasksAC>
export const removeAllTasksAC = (todolistId: string) => {
    return {
        type: "REMOVE_ALL_TASKS",
        payload: {
            todolistId: todolistId,
        },
    } as const
}

type addArrayTasksACType = ReturnType<typeof addArrayTasksAC>
export const addArrayTasksAC = (newTodolistId: string) => {
    return {
        type: "ADD_ARRAY_TASKS",
        payload: {
            newTodolistId: newTodolistId
        },
    } as const
}