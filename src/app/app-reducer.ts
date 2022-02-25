import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/reducer-auth";
import {handleServerAppError} from "../utils/errorUtils/errorUtils";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppProgressActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZE":
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZE',
        isInitialized: isInitialized
    } as const
}
export const setErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error: error
    } as const
}

export const setStatusAC = (status: InitialStateStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status: status
    } as const
}

export type InitialStateType = {
    status: InitialStateStatusType
    error: string | null
    isInitialized: boolean
}

export type InitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppProgressActionsType = SetErrorType | SetStatusType | SetIsInitializedType

export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetStatusType = ReturnType<typeof setStatusAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}



