import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Display from './Display';
import { store, boundActions } from './store';

const Home: React.FC = () => {
    const [state, setState] = useState(store.getState());
    const [todoInput, setTodoInput] = useState('');
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return unsubscribe;
    }, []);
    return (
        <div>
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
            <br />
            <Link to="/display">Go to Display Page</Link>
        </div>
    );
};

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/display" element={<Display />} />
        </Routes>
    </Router>
);

export default App;
