
// import * as React from 'react';
// import { Todo, Store, udapteTodo } from './store'
// import { connect } from 'react-redux'
// import Button from './Button'
// interface ToDoProps extends Todo {
//     onClick: () => void;
//     onClickDelete: () => void;
//     UpdateTodo: (todo: Todo) => void;
// }
// interface ToDoListProps {
//     todos: Todo[];
// }
// interface formSubmitprops extends Todo {
//     UpdateTodo: (todo: Todo) => void;
// }

// interface IState {
//     onEdit?: boolean;
// }

// export class ToDoItem extends React.Component<ToDoProps, IState>{
//     constructor(props) {
//         super(props);
//         this.state = { onEdit: false };
//     }

//     render() {
//         const { id, completed, text, onClick, onClickDelete, UpdateTodo } = this.props;
//         let input1;
//         return (
//             <li className={completed ? 'active' : ''}>
//                 <form className={'todo-item'} onSubmit={e => {
//                     e.preventDefault()
//                     if (!input1.value.trim()) {
//                         return
//                     }
//                     UpdateTodo({ id: id, text: String(input1.value), completed: completed })
//                     input1.value = ''
//                 }}>
//                     <span className={'completed'}>
//                         {text}
//                     </span>
//                     <div className='right'>
//                         <div className={this.state.onEdit ? 'form-edit-open' : 'form-edit-close'}>
//                             <input ref={node => (input1 = node)} type="text" />
//                             <Button onClick={() => { }} status={'success'} type="submit" isActive={true} >
//                                 {'update'}
//                             </Button>
//                         </div>
//                         <div>
//                             <Button
//                                 status={this.state.onEdit ? 'danger' : 'info'}
//                                 isActive={true}
//                                 type={'button'}
//                                 onClick={() => {
//                                     this.setState({ onEdit: !this.state.onEdit })

//                                 }}>
//                                 {this.state.onEdit ? 'close' : 'edit'}
//                             </Button>
//                             <Button onClick={onClickDelete} status={'danger'} type="submit" isActive={true} >
//                                 delete
//                     </Button>
//                             <Button onClick={onClick} status={'info'} type="submit" isActive={true}>
//                                 completed
//                 </Button>
//                         </div>
//                     </div>
//                 </form>
//             </li>
//         )
//     }
// }

// const mapStateToProps = (state: Store): Partial<ToDoListProps> => {
//     return {
//         todos: state.todos
//     }
// }

// const mapDispatchtoProps = (dispatch): Partial<formSubmitprops> => {
//     return {
//         UpdateTodo: (todo: Todo) => {
//             dispatch(
//                 udapteTodo(todo)
//             )
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchtoProps)(ToDoItem);