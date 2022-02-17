const initialState: InitialStateType = {
    status: 'idle',
    error:  null
}

export const appReducer = (state: InitialStateType = initialState, action: AppProgressActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
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
}

export type InitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppProgressActionsType = SetErrorType | SetStatusType

export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetStatusType = ReturnType<typeof setStatusAC>


