// import { createStore, combineReducers, Action, applyMiddleware } from "redux";
// export interface Store {
//     todos: Todo[];
// }

// export interface Todo {
//     id?: number;
//     text?: string;
//     completed?: boolean;
//     loadings?: boolean;
// }

// interface ToDoReducer
//     extends Action<
//         "GET" | "ADD" | "UPDATE" | "DELETE" | "TOGGLE" | "SHOW_TODO_LOADING"
//     > {
//     todo?: Todo;
//     states?: Todo[];
//     loading?: boolean;
// }

// const ToDoReducer = (state: Todo[] = [], action: ToDoReducer) => {
//     switch (action.type) {
//         case "GET":
//             return (state = action.states);
//         case "ADD":
//             return [...state, action.todo];
//         case "UPDATE":
//             const UpdatingTodo = state.find(o => o.id === action.todo.id);
//             if (!UpdatingTodo) {
//                 return state;
//             }
//             UpdatingTodo.text = action.todo.text;
//             UpdatingTodo.completed = action.todo.completed;
//             return [...state];
//         case "DELETE":
//             return state.filter(o => o.id !== action.todo.id);
//         case "TOGGLE":
//             const toggleTodo = state.find(o => o.id === action.todo.id);
//             if (!toggleTodo) {
//                 return state;
//             }
//             toggleTodo.completed = !toggleTodo.completed;
//             return [...state];
//         case "SHOW_TODO_LOADING":
//             const loading = {
//                 loadings: action.loading
//             };
//             if (action.loading == true) {
//                 return [...state, loading];
//             }
//             const result = state.findIndex(o => o.loadings == true);
//             delete state[result];
//             state.splice(result, 1);
//             return [...state];
//         default:
//             return state;
//     }
// };

// const reducers = combineReducers<Store>({
//     todos: ToDoReducer
// });



// const loggerMiddleware = store => {
//     return next => {
//         return action => {
//             return next(action);
//         };
//     };
// };

// const postTodoMiddleware = store => next => action => {
//     if (action.type !== "ADD") {
//         return next(action);
//     }
//     next({
//         type: "SHOW_TODO_LOADING",
//         loading: true
//     });

//     axios
//         .post("http://localhost:3000/api/todos", action.todo)
//         .then(o => {
//             if (o.statusText == "OK") {
//                 next({
//                     ...action,
//                     todo: o.data
//                 });
//             }
//         })
//         .catch(function(error) {
//             alert(error);
//         })
//         .finally(() => {
//             next({
//                 type: "SHOW_TODO_LOADING",
//                 loading: false
//             });
//         });
// };

// const deleteTodoMiddleware = store => next => action => {
//     if (action.type !== "DELETE") {
//         return next(action);
//     }
//     next({
//         type: "SHOW_TODO_LOADING",
//         loading: true
//     });

//     axios
//         .delete("http://localhost:3000/api/todos", {
//             data: {
//                 id: action.todo.id
//             }
//         })
//         .then(o => {
//             if (o.statusText == "OK") {
//                 next({
//                     ...action,
//                     todo: action.todo
//                 });
//             }
//         })
//         .catch(function(error) {
//             alert(error);
//         })
//         .finally(() => {
//             next({
//                 type: "SHOW_TODO_LOADING",
//                 loading: false
//             });
//         });
// };

// const toggleTodoMiddleware = store => next => action => {
//     if (action.type !== "TOGGLE") {
//         return next(action);
//     }
//     next({
//         type: "SHOW_TODO_LOADING",
//         loading: true
//     });

//     axios
//         .put("http://localhost:3000/api/todos", {
//             text: action.todo.text,
//             id: action.todo.id,
//             completed: !action.todo.completed
//         })
//         .then(o => {
//             if (o.statusText == "OK") {
//                 next({
//                     ...action,
//                     todo: action.todo
//                 });
//             }
//         })
//         .catch(function(error) {
//             alert("UPDATE FAILED!");
//         })
//         .finally(() => {
//             next({
//                 type: "SHOW_TODO_LOADING",
//                 loading: false
//             });
//         });
// };

// const updateTodoMiddleware = store => next => action => {
//     if (action.type !== "UPDATE") {
//         return next(action);
//     }
//     next({
//         type: "SHOW_TODO_LOADING",
//         loading: true
//     });

//     axios
//         .put("http://localhost:3000/api/todos", action.todo)
//         .then(o => {
//             if (o.statusText == "OK") {
//                 next({
//                     ...action,
//                     todo: action.todo
//                 });
//             }
//         })
//         .catch(function(error) {
//             alert("UPDATE FAILED!");
//         })
//         .finally(() => {
//             next({
//                 type: "SHOW_TODO_LOADING",
//                 loading: false
//             });
//         });
// };

// const reducer = combineReducers({
//     todos: ToDoReducer
// });


// export const store = createStore(
//     reducer,
//     applyMiddleware(
//         loggerMiddleware,
//         postTodoMiddleware,
//         deleteTodoMiddleware,
//         updateTodoMiddleware,
//         toggleTodoMiddleware
//     )
// );

// export const getTodo = (states: Todo[]): ToDoReducer => ({
//     type: "GET",
//     states
// });

// export const addTodo = (todo: Todo): ToDoReducer => ({
//     type: "ADD",
//     todo
// });

// export const udapteTodo = (todo: Todo): ToDoReducer => ({
//     type: "UPDATE",
//     todo
// });

// export const deleteTodo = (todo: Todo): ToDoReducer => ({
//     type: "DELETE",
//     todo
// });

// export const toggleTodo = (todo: Todo): ToDoReducer => ({
//     type: "TOGGLE",
//     todo
// });
