import {TasksStateType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST, addTodolistACType, removeTodolistACType, REMOVE_TODOLIST} from "./reducer-todolist";

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type changeStatusACType = ReturnType<typeof changeStatusAC>

type ActionsType =
    removeTaskACType
    | addTaskACType
    | changeStatusACType
    | changeTaskTitleACType
    | removeTodolistACType
    | addTodolistACType

const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK = "ADD_TASK";
const CHANGE_STATUS = "CHANGE_STATUS";
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";

let initialState = {}

export const TaskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.newTaskTitle,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case CHANGE_STATUS:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {
                    ...m,
                    isDone: action.payload.isDone
                } : m)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {
                    ...m,
                    title: action.payload.localTitle
                } : m),
            }
        case ADD_TODOLIST: {
            return {
                ...state,
                [action.payload.id]: []
            }
        }
        case REMOVE_TODOLIST: {
            let copyTasks = {...state}
            delete copyTasks[action.payload.todolistId]
            return copyTasks
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            todolistId: todolistId,
            id: id
        },
    } as const
} // тест сделан
export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: "ADD_TASK",
        payload: {
            todolistId: todolistId,
            newTaskTitle: newTaskTitle
        },
    } as const
} // тест сделан

export const changeStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: "CHANGE_STATUS",
        payload: {
            todolistId: todolistId,
            id: id,
            isDone: isDone
        },
    } as const
} // тест сделан

export const changeTaskTitleAC = (todolistId: string, localTitle: string, id: string) => {
    return {
        type: "CHANGE_TASK_TITLE",
        payload: {
            todolistId: todolistId,
            localTitle: localTitle,
            id: id
        },
    } as const
} // тест сделан