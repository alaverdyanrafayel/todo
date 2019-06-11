import {Record} from 'immutable';
import moment from 'moment';
import {Todo} from '../types';

export const TodoRecord = Record({
  id: '',
  title: '',
  date: moment(),
  completed: false,
});

export class TodoModel extends TodoRecord {
  static create(props: Todo) {
    return new TodoModel(props);
  }
}
