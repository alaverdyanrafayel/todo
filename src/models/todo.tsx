import {Record} from 'immutable';
import moment from 'moment';
import uuid from 'uuid';

export const TodoRecord = Record({
  id: '',
  title: '',
  date: moment(),
  completed: false,
});

export class TodoModel extends TodoRecord {
  static create(props: TodoModel) {
    return new TodoModel({...props, id: uuid()});
  }
}
