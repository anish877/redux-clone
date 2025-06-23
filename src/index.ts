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