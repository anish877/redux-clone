import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createStore } from '../../src/index';
import './App.css';

interface CounterAction {
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

const store = createStore(counter);

const Home: React.FC = () => {
    const [count, setCount] = useState(store.getState());
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCount(store.getState());
        });
        return unsubscribe;
    }, []);
    return (
        <div>
            <h1>Custom Redux Counter Demo</h1>
            <h2>Counter: {count}</h2>
            <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>Decrement</button>
            <br />
            <Link to="/display">Go to Display Page</Link>
        </div>
    );
};

const Display: React.FC = () => {
    const [count, setCount] = useState(store.getState());
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCount(store.getState());
        });
        return unsubscribe;
    }, []);
    return (
        <div>
            <h1>Display Page</h1>
            <h2>Counter Value: {count}</h2>
            <Link to="/">Back to Home</Link>
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
