import {TodolistActionsType, todolistsReducer} from "./reducer-todolist";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {TasksActionsType, tasksReducer} from "./reducer-tasks";
import {AppProgressActionsType, appReducer} from "../app/app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/reducer-auth";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для App
export type AppActionsType = TodolistActionsType | TasksActionsType | AppProgressActionsType | AuthActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
