import {combineReducers} from 'redux';
import {todosReducer} from './todos/reducer';
import {sortingReducer} from './sorting/reducer';
import {filterReducer} from './filter/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  sorting: sortingReducer,
  filter: filterReducer,
});

export type ReduxState = ReturnType<typeof rootReducer>;
export default rootReducer;
