import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Display from './Display';
import { store } from './store';

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
            <h2>Counter: {count}</h2>
            <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>Decrement</button>
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
