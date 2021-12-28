import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {
    addArrayTasksAC,
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./reducer-tasks";

let state: {
    [key: string]: Array<TaskType>
}
let todolistID1: string
let todolistID2: string
let todolistID3: string
let task1: string
let task2: string
let task4: string
let task5: string

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();
    todolistID3 = v1()
    task1 = v1();
    task2 = v1();
    task4 = v1();
    task5 = v1()
    state = {
        [todolistID1]: [
            {id: task1, title: "HTML&CSS", isDone: true},
            {id: task2, title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: task4, title: "HTML&CSS2", isDone: true},
            {id: task5, title: "JS2", isDone: true},
        ]
    }
})

test("addTask test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // todolistId: string, newTaskTitle: string // данные, которые должны передавать
    const addTask = TaskReducer(state, addTaskAC(todolistID2, "newTaskTitle"))
    expect(addTask[todolistID2].length).toBe(3)
})

test("removeTask test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // todolistId: string, id: string // данные, которые должны передавать
    const removeTask = TaskReducer(state, removeTaskAC(todolistID1, task2))
    expect(removeTask[todolistID1].length).toBe(1)
})

test("changeStatus test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // todolistId: string, id: string, isDone: boolean // данные, которые должны передавать
    const changeStatus = TaskReducer(state, changeStatusAC(todolistID1, task1, false))
    expect(changeStatus[todolistID1][0].isDone).toBe(false)
})

test("changeTaskTitle test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // todolistId: string, localTitle: string,  id: string // данные, которые должны передавать
    const changeTaskTitle = TaskReducer(state, changeTaskTitleAC(todolistID1, "localTitle", task2))
    // ???
    expect(changeTaskTitle[todolistID1][1].title).toBe("localTitle")
})

test("addArrayTasks test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    //newTodoListID // данные, которые должны передавать
    const addArrayTasks = TaskReducer(state, addArrayTasksAC(todolistID3))
    expect(addArrayTasks[todolistID3].length).toBe(0)
})