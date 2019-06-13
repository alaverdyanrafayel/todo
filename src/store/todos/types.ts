import moment from 'moment';
import {Map} from 'immutable';
import {TodoModel} from '../../models/todo';
import {updateTodo, toggleComplete, addTodo, setTodos} from './actions';

// Describing action names
export const SET_TODOS = 'SET_TODOS' as 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO' as 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO' as 'UPDATE_TODO';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE' as 'TOGGLE_COMPLETE';

type SetTodosAction = ReturnType<typeof setTodos>;

type AddToDoAction = ReturnType<typeof addTodo>;

type UpdateTodoAction = ReturnType<typeof updateTodo>;

type ToggleCompleteAction = ReturnType<typeof toggleComplete>;

export type TodosActionTypes =
  | SetTodosAction
  | AddToDoAction
  | UpdateTodoAction
  | ToggleCompleteAction;

export type TodosState = {
  todos: Map<string, TodoModel>;
};
