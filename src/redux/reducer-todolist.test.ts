import {TodolistsType} from "../App";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./reducer-todolist";

let state: Array<TodolistsType>
let todolist1: string
let todolist2: string
let todolist3: string

beforeEach(() => {
    todolist1 = v1()
    todolist2 = v1()
    todolist3 = v1()

    state = [
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ]
})

test("addTodolist test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // newTitle: string, newTodoListID // данные, которые должны передавать
    const addTodolist = TodolistReducer(state, addTodolistAC("new", todolist3))
    expect(addTodolist.length).toBe(3)
    expect(addTodolist[2].title).toBe("new")
})

test("removeTodolist test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // todolistId: string // данные, которые должны передавать
    const removeTodolist = TodolistReducer(state, removeTodolistAC(todolist1))
    expect(removeTodolist.length).toBe(1)
})

test("changeTodolistTitle test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // todolistId: string, localTitle: string // данные, которые должны передавать
    const changeTodolistTitle = TodolistReducer(state, changeTodolistTitleAC(todolist2, "What to eat"))
    expect(changeTodolistTitle[1].title).toBe("What to eat")
})

test("changeFilter test", () => {
    // данные, с которыми проводим тест, берутся из beforeEach
    // todolistId: string, filter: FilterValueType // данные, которые должны передавать
    const changeFilter = TodolistReducer(state, changeFilterAC(todolist1, "Active"))
    expect(changeFilter[0].filter).toBe("Active")
})