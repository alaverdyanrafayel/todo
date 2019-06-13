import {combineReducers} from 'redux';
import {todosReducer} from './todos/reducer';
import {TodosState} from './todos/types';

const rootReducer = combineReducers({
  todos: todosReducer,
} as any);

export type ReduxState = {
  todos: TodosState;
};
export default rootReducer;
