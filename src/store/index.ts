import {combineReducers} from 'redux';
import {todosReducer} from './todos/reducer';
import {sortingReducer} from './sorting/reducer';
import {filterReducer} from './filter/reducer';
import {settingsReducer} from './settings/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  sorting: sortingReducer,
  filter: filterReducer,
  settings: settingsReducer,
});

export type ReduxState = ReturnType<typeof rootReducer>;
export default rootReducer;
