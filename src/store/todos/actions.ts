import {Map} from 'immutable';
import moment from 'moment';
import {SET_TODOS, ADD_TODO, TOGGLE_COMPLETE, UPDATE_TODO} from './types';
import {TodoModel} from '../../models/todo';

export const setTodos = (todos: Map<string, TodoModel>) => {
  return {
    type: SET_TODOS,
    payload: todos,
  };
};
export const addTodo = (todo: TodoModel) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const toggleComplete = (id: string) => {
  return {
    type: TOGGLE_COMPLETE,
    payload: id,
  };
};

export const updateTodo = (id: string, data: {date: moment.Moment}) => {
  return {
    type: UPDATE_TODO,
    payload: {id, data},
  };
};
