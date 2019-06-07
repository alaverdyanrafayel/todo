import moment from 'moment';

export type Todo = {
  id: string;
  title: string;
  date: moment.Moment;
  completed: boolean;
};
