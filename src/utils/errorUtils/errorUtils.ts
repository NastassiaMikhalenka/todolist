import {ResponseType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "../../app/app-reducer";

export const handleServerAppError = <D> (data: ResponseType<D>, dispatch: Dispatch) =>{
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some Error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

// for catch
export const handleServerNetworkError = (error: any, dispatch: Dispatch) =>{
    dispatch(setErrorAC(error.message ? error.message : 'Some Error occurred'))
    dispatch(setStatusAC('failed'))
}

