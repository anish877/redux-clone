"use strict";
function createStore(reducer) {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    };
    dispatch({ type: '@INIT' });
    return {
        getState,
        dispatch,
        subscribe
    };
}
function combineReducers(reducers) {
    return function (state = {}, action) {
        let newState = {};
        for (let key in reducers) {
            const reducer = reducers[key];
            const prevStateForKey = state[key];
            newState[key] = reducer(prevStateForKey, action);
        }
        return newState;
    };
}
function bindActionCreators(actionCreators, dispatch) {
    let bound = {};
    for (let key in actionCreators) {
        const actionCreator = actionCreators[key];
        bound[key] = function (...args) {
            return dispatch(actionCreator(...args));
        };
    }
    return bound;
}
