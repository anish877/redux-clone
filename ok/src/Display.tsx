import React, { useEffect, useState } from 'react';
import { store } from './store';
import { Link } from 'react-router-dom';

const Display: React.FC = () => {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return unsubscribe;
    }, []);
    return (
        <div>
            <h1>Display Page</h1>
            <h2>Counter Value: {state.counter}</h2>
            <h2>Todos</h2>
            <ul>
                {state.todos && state.todos.map((todo: string, idx: number) => (
                    <li key={idx}>{todo}</li>
                ))}
            </ul>
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default Display; 