import moment from 'moment';
import {Map} from 'immutable';
import {TodoModel} from '../../models/todo';

// Describing action names
export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

export type SetTodosAction = {
  type: typeof SET_TODOS;
  payload: Map<string, TodoModel>;
};

export type AddToDoAction = {
  type: typeof ADD_TODO;
  payload: TodoModel;
};

export type UpdateTodoAction = {
  type: typeof UPDATE_TODO;
  payload: {id: string; data: {date: moment.Moment}};
};

export type ToggleCompleteAction = {
  type: typeof TOGGLE_COMPLETE;
  payload: string;
};

export type TodosActionTypes =
  | SetTodosAction
  | AddToDoAction
  | UpdateTodoAction
  | ToggleCompleteAction;

export type TodosState = {
  todos: Map<string, TodoModel>;
};
