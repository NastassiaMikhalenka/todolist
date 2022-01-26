
// import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";
// import {
//     addTodolistAC,
//     changeFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     TodolistReducer
// } from "./reducer-todolist";
//
// let startState: Array<TodolistsType>
// let todolistId1: string
// let todolistId2: string
//
// beforeEach(() => {
//     todolistId1 = v1();
//     todolistId2 = v1();
//
//     startState = [
//         {id: todolistId1, title: "What to learn", filter: "All"},
//         {id: todolistId2, title: "What to buy", filter: "All"}
//     ]
// })
//
// test('correct todolist should be removed', () => {
//
//     const endState = TodolistReducer(startState, removeTodolistAC(todolistId1))
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });
//
// test('correct todolist should be added', () => {
//     let newTodolistTitle = "New Todolist";
//
//     const endState = TodolistReducer(startState, addTodolistAC(newTodolistTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
//     expect(endState[2].filter).toBe("All");
//     expect(endState[2].id).toBeDefined();
// });
//
// test('correct todolist should change its name', () => {
//     let newTodolistTitle = "New Todolist";
//
//     const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);
//
//     const endState = TodolistReducer(startState, action);
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterValueType = "Completed";
//
//     const action = changeFilterAC(todolistId2, newFilter);
//
//     const endState = TodolistReducer(startState, action);
//
//     expect(endState[0].filter).toBe("All");
//     expect(endState[1].filter).toBe(newFilter);
// });
// @ts-ignore