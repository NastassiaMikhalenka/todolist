import {TasksStateType} from "../App";
// import {
//     addTaskAC,
//     changeStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
//     TaskReducer
// } from "./reducer-tasks";
// import {addTodolistAC} from "./reducer-todolist";
//
// let startState: TasksStateType
//
// beforeEach(() => {
//     startState = {
//         "todolistId1": [
//             {id: "1", title: "CSS", isDone: false},
//             {id: "2", title: "JS", isDone: true},
//             {id: "3", title: "React", isDone: false}
//         ],
//         "todolistId2": [
//             {id: "1", title: "bread", isDone: false},
//             {id: "2", title: "milk", isDone: true},
//             {id: "3", title: "tea", isDone: false}
//         ]
//     };
// })
//
//
// test('correct task should be deleted from correct array', () => {
//     const action = removeTaskAC("todolistId2", "2");
//     const endState = TaskReducer(startState, action)
//     expect(endState).toEqual({
//         "todolistId1": [
//             {id: "1", title: "CSS", isDone: false},
//             {id: "2", title: "JS", isDone: true},
//             {id: "3", title: "React", isDone: false}
//         ],
//         "todolistId2": [
//             {id: "1", title: "bread", isDone: false},
//             {id: "3", title: "tea", isDone: false}
//         ]
//     });
//
// });
//
// test('correct task should be added to correct array', () => {
//     const action = addTaskAC("todolistId2", "juice",);
//     const endState = TaskReducer(startState, action)
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(4);
//     expect(endState["todolistId2"][0].id).toBeDefined();
//     expect(endState["todolistId2"][0].title).toBe("juice");
//     expect(endState["todolistId2"][0].isDone).toBe(false);
// })
//
// test('status of specified task should be changed', () => {
//     const action = changeStatusAC("todolistId2", "2", false,);
//
//     const endState = TaskReducer(startState, action)
//
//     expect(endState["todolistId2"][1].isDone).toBe(false);
//     // expect().toBe();
// });
//
// test('status of specified task title should be changed', () => {
//     const action = changeTaskTitleAC("todolistId2", "lemon", "2");
//     const endState = TaskReducer(startState, action)
//     expect(endState["todolistId2"][1].title).toBe("lemon");
// });
//
// test('new array should be added when new todolist is added', () => {
//     const action = addTodolistAC("new todolist");
//     const endState = TaskReducer(startState, action)
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });