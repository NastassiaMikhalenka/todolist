import {FilterValueType, TodolistsType} from "../App";

type ActionsType = changeFilterACType | removeTodolistACType | changeTodolistTitleACType | addTodolistACType

export const TodolistReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {
        case "CHANGE_FILTER": {
            return state.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.filter} : m)
        }
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id != action.payload.id)
        }
        case "CHANGE_TODOLIST_TITLE": {
            let todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist) {
                todolist.title = action.payload.localTitle
            }
            return [...state]
        }
        case "ADD_TODOLIST": {
            return [...state, {id: action.payload.newTodoListID, title: action.payload.newTitle, filter: "All"}]
        }
        default:
            return state
    }
};

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {
        type: "CHANGE_FILTER",
        payload: {
            todolistId: todolistId,
            filter: filter,
        },
    } as const
} // тест написан

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            id: id,
        },
    } as const
} // тест написан

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, localTitle: string) => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        payload: {
            todolistId: todolistId,
            localTitle: localTitle,
        },
    } as const
} // тест написан

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string, newTodoListID: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            newTitle: newTitle,
            newTodoListID: newTodoListID,
        },
    } as const
} // тест написан