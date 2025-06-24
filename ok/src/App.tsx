import React, { useEffect, useState } from 'react';
import { createStore, combineReducers, bindActionCreators } from '../../src/index';
import './App.css';

// Counter reducer
function counter(state = 0, action: any) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// Todo reducer
function todos(state: string[] = [], action: any) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.text];
        default:
            return state;
    }
}

const rootReducer = combineReducers({ counter, todos });
const store = createStore(rootReducer);

const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });
const addTodo = (text: string) => ({ type: 'ADD_TODO', text });

const actions = { increment, decrement, addTodo };
const boundActions = bindActionCreators(actions, store.dispatch);

const App: React.FC = () => {
    const [state, setState] = useState(store.getState());
    const [todoInput, setTodoInput] = useState('');

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return unsubscribe;
    }, []);

    return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
            <h1>Custom Redux Demo</h1>
            <h2>Counter: {state.counter}</h2>
            <button onClick={boundActions.increment}>Increment</button>
            <button onClick={boundActions.decrement}>Decrement</button>
            <h2>Todos</h2>
            <ul>
                {state.todos && state.todos.map((todo: string, idx: number) => (
                    <li key={idx}>{todo}</li>
                ))}
            </ul>
            <input
                value={todoInput}
                onChange={e => setTodoInput(e.target.value)}
                placeholder="Add todo"
            />
            <button onClick={() => {
                if (todoInput.trim()) {
                    boundActions.addTodo(todoInput);
                    setTodoInput('');
                }
            }}>Add Todo</button>
        </div>
    );
};

export default App;
