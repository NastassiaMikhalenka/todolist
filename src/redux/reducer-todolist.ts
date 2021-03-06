import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType} from "./store";
import {InitialStateStatusType, setStatusAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils/errorUtils";
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodosActionType = ReturnType<typeof setTodosAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodosActionType
    | ChangeTodolistEntityStatusActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: InitialStateStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET_TODOS':
            let stateRoot: Array<TodolistDomainType> = action.todolists.map((tl) => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
            return stateRoot
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // ???????? ?????????????? - ?????????????? ?????? ??????????????????
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodosAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET_TODOS', todolists,} as const
}

export const changeTodolistEntityStatusAC = (id: string, status: InitialStateStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id: id, status: status} as const
}

// thunk

export const setTodosTC = (): AppThunkType => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    dispatch(setStatusAC('loading'))
    // 1.side effects
    todolistsAPI.getTodolists()
        .then((res) => {
            let todos = res.data
            // 2. dispatch action (thunk)
            dispatch(setTodosAC(todos))
            dispatch(setStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodoTC = (todolistId: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setStatusAC('succeeded'))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTodoTC = (title: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    let title = res.data.data.item
                    dispatch(addTodolistAC(title))
                    dispatch(setStatusAC('succeeded'))
                }
                else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}