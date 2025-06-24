function createStore(reducer:any){
    let state:any;
    let listeners:any[] = [];

    const getState = () => state;

    const dispatch = (action:any) => {
        state = reducer(state,action);
        listeners.forEach((listener:any) => listener());
    }

    const subscribe = (listener:any) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l:any) => l !== listener);
        }
    }

    dispatch({type: '@INIT'})

    return {
        getState,
        dispatch,
        subscribe
    }
}

function combineReducers(reducers: { [key: string]: (state: any, action: any) => any }) {
    return function(state: any = {}, action: any) {
        let newState: { [key: string]: any } = {};
        for (let key in reducers) {
            const reducer = reducers[key];
            const prevStateForKey = state[key];
            newState[key] = reducer(prevStateForKey, action);
        }
        return newState;
    };
}
