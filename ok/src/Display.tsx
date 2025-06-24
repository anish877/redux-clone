import React, { useEffect, useState } from 'react';
import { store } from './store';
import { Link } from 'react-router-dom';

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

export default Display; 