import { createStore } from 'redux';

interface LabeledValue {
  index: number,
  type: string
}

function counter(state = 0, LabeledValue) {
  switch (LabeledValue.type) {
    case 'INCREMENT':
      return state + LabeledValue.index
    case 'DECREMENT':
      return state - LabeledValue.index
    default:
      return state
  }
} 

const decren = (index) => {
  return (
    {
      type: 'DECREMENT', index
    }
  )
}

const incre = (index) => {
  return (
    {
      type: 'INCREMENT', index
    }
  )
}
let store = createStore(counter)

store.subscribe(() => console.log(store.getState()))
store.dispatch(incre(1))
store.dispatch(incre(2))
store.dispatch(decren(3))