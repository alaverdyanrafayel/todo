import {combineReducers} from 'redux';
import {todosReducer} from './todos/reducer';
import {TodosState} from './todos/types';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type ReduxState = ReturnType<typeof rootReducer>;
export default rootReducer;
