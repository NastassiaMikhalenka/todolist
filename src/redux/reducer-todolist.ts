import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionsType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

const CHANGE_FILTER = "CHANGE_FILTER";
export const REMOVE_TODOLIST = "REMOVE_TODOLIST";
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE";
export const ADD_TODOLIST = "ADD_TODOLIST";

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>


let initialState: Array<TodolistsType> = []

export const TodolistReducer = (state: Array<TodolistsType> = initialState, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {
        case CHANGE_FILTER: {
            return state.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.filter} : m)
        }
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id != action.payload.todolistId)
        }
        case CHANGE_TODOLIST_TITLE: {
            let todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist) {
                todolist.title = action.payload.localTitle
            }
            return [...state]
        }
        case ADD_TODOLIST: {
            return [...state, {id: action.payload.id, title: action.payload.newTitle, filter: "All"}]
        }
        default:
            return state
    }
};

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            todolistId: todolistId,
        },
    } as const
} // тест написан

export const addTodolistAC = (newTitle: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            newTitle: newTitle,
            id: v1(),
        },
    } as const
} // тест написан

export const changeTodolistTitleAC = (todolistId: string, localTitle: string) => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        payload: {
            todolistId: todolistId,
            localTitle: localTitle,
        },
    } as const
} // тест написан

export const changeFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {
        type: "CHANGE_FILTER",
        payload: {
            todolistId: todolistId,
            filter: filter,
        },
    } as const
} // тест написан
