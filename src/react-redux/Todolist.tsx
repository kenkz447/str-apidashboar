// import * as React from 'react';
// import { Todo, Store, toggleTodo, addTodo, deleteTodo, getTodo } from './store'
// import { connect } from 'react-redux'
// import ToDoItem from './ToDoItem';
// import Button, { Type } from './Button';

// interface ToDoListProps {
//     todos: Todo[];
//     onToDoClick: (todo: Todo) => void;
//     onToDoClickAdd: (todo: Todo) => void;
//     DeleteTodo: (todo: Todo) => void;
//     mapAllapitoprops: (todo) => void;
// }

// interface IState {
//     filter?: string;
//     isLoading?: boolean;
// }

// class TodoList extends React.Component<ToDoListProps, IState> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             filter: 'All',
//         };
//     }

//     componentDidMount() {
//         fetch("http://localhost:3000/api/todos")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     this.props.mapAllapitoprops(result);
//                 },
//                 (error) => {
//                     alert(error)
//                 }
//             )
//     }

//     render() {
//         const { todos, onToDoClick, onToDoClickAdd, DeleteTodo } = this.props
//         let input;
//         return (
//             <>
//                 <ul className={'todo-list'}>
//                     {todos.find(o => o.loadings == true) ?
//                         <li className={"loading"}><div className="lds-facebook"><div></div><div></div><div></div></div></li>
//                         : ""}
//                     <li className='form-submit'>
//                         <form className={'todo-item'} onSubmit={e => {
//                             e.preventDefault()
//                             if (!input.value.trim()) {
//                                 return
//                             }
//                             onToDoClickAdd(input.value)
//                             input.value = ''
//                         }}>
//                             <input ref={node => (input = node)} type="text" />
//                             <Button isActive={true} onClick={() => { }} type="submit" status={'info'} >add</Button>
//                         </form>
//                         <div>
//                             <Button status={'info'} isActive={this.state.filter == 'Completed' ? false : true} type={'button'} onClick={() => {
//                                 this.setState({
//                                     filter: "Completed"
//                                 });
//                             }}>Completed</Button>
//                             <Button status={'info'} isActive={this.state.filter == 'Active' ? false : true} type={'button'} onClick={() => {
//                                 this.setState({
//                                     filter: "Active"
//                                 });
//                             }}>Active</Button>
//                             <Button status={'info'} isActive={this.state.filter == 'All' ? false : true} type={'button'} onClick={() => {
//                                 this.setState({
//                                     filter: "All"
//                                 });
//                             }}>All</Button>
//                         </div>
//                     </li>
//                     {
//                         todos.map((todo, index) => {
//                             if (!todo.loadings) {
//                                 if (this.state.filter == "All") {
//                                     return (
//                                         <ToDoItem
//                                             key={index}
//                                             {...todo}
//                                             onClick={() => {
//                                                 onToDoClick(todo);
//                                             }}
//                                             onClickDelete={() => {
//                                                 DeleteTodo(todo);
//                                             }}
//                                         />
//                                     )
//                                 } else if (this.state.filter == "Active") {
//                                     if (todo.completed == true) {
//                                         return (
//                                             <ToDoItem
//                                                 key={index}
//                                                 {...todo}
//                                                 onClick={() => {
//                                                     onToDoClick(todo);
//                                                 }}
//                                                 onClickDelete={() => {
//                                                     DeleteTodo(todo);
//                                                 }}
//                                             />
//                                         )
//                                     }
//                                 }
//                                 else {
//                                     if (todo.completed == false) {
//                                         return (
//                                             <ToDoItem
//                                                 key={index}
//                                                 {...todo}
//                                                 onClick={() => {
//                                                     onToDoClick(todo);
//                                                 }}
//                                                 onClickDelete={() => {
//                                                     DeleteTodo(todo);
//                                                 }}
//                                             />
//                                         )
//                                     }
//                                     <ToDoItem
//                                         key={index}
//                                         {...todo}
//                                         onClick={() => {
//                                             onToDoClick(todo);
//                                         }}
//                                         onClickDelete={() => {
//                                             DeleteTodo(todo);
//                                         }}
//                                     />
//                                 }
//                             }

//                         })
//                     }
//                 </ul>
//             </>
//         );
//     }
// }

// const mapStateToProps = (state: Store): Partial<ToDoListProps> => {
//     return {
//         todos: state.todos
//     }
// }


// const mapDispatchtoProps = (dispatch): Partial<ToDoListProps> => {
//     return {
//         mapAllapitoprops: (todo) => {
//             dispatch(
//                 getTodo(todo),
//             )
//         },
//         onToDoClick: (todo: Todo) => {
//             dispatch(
//                 toggleTodo(todo)
//             )
//         }
//         ,
//         onToDoClickAdd: (todo: Todo) => {
//             dispatch(
//                 addTodo({ id: Math.floor(Math.random() * 999999), text: String(todo), completed: false })
//             )
//         },
//         DeleteTodo: (todo: Todo) => {
//             dispatch(
//                 deleteTodo(todo)
//             )
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchtoProps)(TodoList)