import { createStore, combineReducers, bindActionCreators } from '../../src/index';

export interface CounterAction {
    type: 'INCREMENT' | 'DECREMENT';
}

function counter(state: number = 0, action: CounterAction): number {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export interface TodoAction {
    type: 'ADD_TODO';
    text: string;
}

function todos(state: string[] = [], action: TodoAction): string[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.text];
        default:
            return state;
    }
}

const rootReducer = combineReducers({ counter, todos });
export const store = createStore(rootReducer);

export const actions = {
    increment: () => ({ type: 'INCREMENT' }),
    decrement: () => ({ type: 'DECREMENT' }),
    addTodo: (text: string) => ({ type: 'ADD_TODO', text })
};

export const boundActions = bindActionCreators(actions, store.dispatch); 