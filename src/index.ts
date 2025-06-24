export function createStore(reducer:any){
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

export function combineReducers(reducers: { [key: string]: (state: any, action: any) => any }) {
    return function combination(state: { [key: string]: any } = {}, action: any) {
      const nextState: { [key: string]: any } = {};
      for (let key in reducers) {
        const reducer = reducers[key];
        const prevSlice = state[key];
        const nextSlice = reducer(prevSlice, action);
        if (typeof nextSlice === 'undefined') {
          throw new Error("Reducer must not return undefined");
        }
        nextState[key] = nextSlice;
      }
      return nextState;
    };
}
  

export function bindActionCreators(actionCreators: { [key: string]: (...args: any[]) => any }, dispatch: any) {
    let bound: { [key: string]: (...args: any[]) => any } = {};
    for(let key in actionCreators){
        const actionCreator = actionCreators[key];
        bound[key] = function(...args:any[]){
            return dispatch(actionCreator(...args));
        }
    }
    return bound;
}
    