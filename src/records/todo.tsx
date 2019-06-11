import {Record} from 'immutable';
import moment from 'moment';

export const TodoRecord = Record({
  id: '',
  title: '',
  date: moment(),
  completed: false,
});
