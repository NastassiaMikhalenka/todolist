import {TasksStateType} from '../App';
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from "./reducer-todolist";
import {AppActionsType, AppRootStateType, AppThunkType} from "./store";



export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "SET_TODOS":
            const copyState = {...state}
            action.todolists.forEach((el) => {
                copyState[el.id] = []
            })
            return copyState
        case 'SET-TASKS': {
            const stateCopy1 = {...state}
            stateCopy1[action.todolistId] = action.tasks
            return stateCopy1
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}


// thunk
export const fetchTasksTC = (todolistId: string): AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                }
            })
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunkType => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (todoId: string, taskId: string, domainModal: UpdateDomainTaskModelType): AppThunkType => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const appState = getState()
    const tasksApp = appState.tasks
    const tasksForCurrentTodo = tasksApp[todoId]
    const currentTask = tasksForCurrentTodo.find((t) => {
        return t.id === taskId
    })

    if (!currentTask) {
        console.log('Not found')
        return
    }
    const model: UpdateTaskModelType = {
        title: currentTask.title,
        status: currentTask.status,
        description: currentTask.description,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline,
        ...domainModal
    }
    todolistsAPI.updateTask(todoId, taskId, model)
        .then((res) => {
            dispatch(updateTaskAC(taskId, domainModal, todoId));
        })
}
