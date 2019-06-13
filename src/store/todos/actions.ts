import {Map} from 'immutable';
import moment from 'moment';
import {
  SET_TODOS,
  ADD_TODO,
  TOGGLE_COMPLETE,
  UPDATE_TODO,
  SetTodosAction,
  AddToDoAction,
  ToggleCompleteAction,
  UpdateTodoAction,
} from './types';
import {TodoModel} from '../../models/todo';

export const setTodos = (todos: Map<string, TodoModel>): SetTodosAction => {
  return {
    type: SET_TODOS,
    payload: todos,
  };
};

export const addTodo = (todo: TodoModel): AddToDoAction => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const toggleComplete = (id: string): ToggleCompleteAction => {
  return {
    type: TOGGLE_COMPLETE,
    payload: id,
  };
};

export const updateTodo = (id: string, data: {date: moment.Moment}): UpdateTodoAction => {
  return {
    type: UPDATE_TODO,
    payload: {id, data},
  };
};
