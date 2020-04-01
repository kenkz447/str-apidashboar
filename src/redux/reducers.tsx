import { createStore } from 'redux'

const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    DONE: 'DONE_ONLY',
    UNDONE: 'UNDONE',
    KEY: 'KEY'
};

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: [{
        content: 'abc',
        isDone: true,
    }, {
        content: 'xyz',
        isDone: false,
    }]
}

function todoApp(state = initialState, action) {
    switch (action.type) {
        case VisibilityFilters.SHOW_ALL:
            return {
                ...state,
                visibilityFilter: action.filter,
                todos: initialState.todos
            }

        case VisibilityFilters.DONE:
            return {
                ...state,
                visibilityFilter: action.filter,
                todos: initialState.todos.filter(o => o.isDone === true)
            }

        case VisibilityFilters.UNDONE:
            return {
                ...state,
                visibilityFilter: action.filter,
                todos: initialState.todos.filter(o => o.isDone === false)
            }
        case VisibilityFilters.KEY:
            return {
                ...state,
                visibilityFilter: action.filter,
                todos: initialState.todos.filter(todo => {
                    return todo.content.includes(action.keyword) || action.keyword.includes(todo.content)
                })
            }

        default:
            return state;
    }
}

const showAll = () => ({
    type: VisibilityFilters.SHOW_ALL
});

const showDone = () => ({
    type: VisibilityFilters.DONE
});

const showUndone = () => ({
    type: VisibilityFilters.UNDONE
});
const showKey = (keyword) => (
    {
        type: VisibilityFilters.KEY,
        keyword
    });

    

const store = createStore(todoApp)
store.subscribe(() => console.log(store.getState()))

store.dispatch(showAll())
store.dispatch(showDone())
store.dispatch(showUndone())
store.dispatch(showKey('a'))
store.dispatch(showKey('z'))
store.dispatch(showKey('3'))