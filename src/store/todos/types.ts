import {Map} from 'immutable';
import {TodoModel} from '../../models/todo';
import {
  updateTodo,
  toggleComplete,
  addTodoSucceed,
  addTodoFailed,
  loadTodosSucceed,
  addTodo,
} from './actions';

// Describing action names
export const LOAD_TODOS = 'LOAD_TODOS' as 'LOAD_TODOS';
export const LOAD_TODOS_SUCCEED = 'LOAD_TODOS_SUCCEED' as 'LOAD_TODOS_SUCCEED';

export const ADD_TODO = 'ADD_TODO' as 'ADD_TODO';
export const ADD_TODO_SUCCEED = 'ADD_TODO_SUCCEED' as 'ADD_TODO_SUCCEED';
export const ADD_TODO_FAILED = 'ADD_TODO_FAILED' as 'ADD_TODO_FAILED';

export const UPDATE_TODO = 'UPDATE_TODO' as 'UPDATE_TODO';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE' as 'TOGGLE_COMPLETE';

export type AddToDoAction = ReturnType<typeof addTodo>;

type AddTodoSucceedAction = ReturnType<typeof addTodoSucceed>;

type AddTodoFailedAction = ReturnType<typeof addTodoFailed>;

type LoadTodosSucceedAction = ReturnType<typeof loadTodosSucceed>;

type UpdateTodoAction = ReturnType<typeof updateTodo>;

type ToggleCompleteAction = ReturnType<typeof toggleComplete>;

export type TodosActionTypes =
  | AddToDoAction
  | AddTodoSucceedAction
  | AddTodoFailedAction
  | LoadTodosSucceedAction
  | UpdateTodoAction
  | ToggleCompleteAction;

export type TodosState = {
  todos: Map<string, TodoModel>;
};
