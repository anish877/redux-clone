import { createStore } from '../../src/index';

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

export const store = createStore(counter); 