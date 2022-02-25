import {Dispatch} from "redux";
import {AppThunkType} from "../../redux/store";
import {setStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils/errorUtils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = {
    isLoggedIn: boolean
}

export type AuthActionsType = SetIsLoggedInType

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':

            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>

// thunk
export const loginTC = (data: LoginParamsType): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const logoutTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

