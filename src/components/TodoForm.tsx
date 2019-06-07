import React, {Component} from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';

type TodoFormState = {
  title: string;
  date: moment.Moment;
};
type TodoFormProps = {
  addTodoHandler: Function;
};

export class TodoForm extends Component<TodoFormProps, TodoFormState> {
  state = {
    title: '',
    date: moment(),
  };

  inputChangeHandler = ({target: {value, name}}: {target: HTMLInputElement}): void => {
    // @ts-ignore
    this.setState({[name]: value});
  };

  clearInput = () => {
    this.setState({title: '', date: moment()});
  };

  submitFormHandler = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    const id = uuid();
    const {title, date} = this.state;
    this.props.addTodoHandler({id, title, date, completed: false}, this.clearInput);
  };

  render() {
    const {title, date} = this.state;
    return (
      <div style={styles.container}>
        <form onSubmit={this.submitFormHandler} autoComplete='off'>
          <label htmlFor='new-task' style={styles.label}>
            Add Todo
          </label>
          <input
            id='new-task'
            name='title'
            value={title}
            onChange={this.inputChangeHandler}
            style={styles.input}
          />
          <input
            type='date'
            name='date'
            value={moment(date).format('YYYY-MM-DD')}
            onChange={this.inputChangeHandler}
          />
          <button type='button' onClick={this.submitFormHandler} style={styles.button}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400',
  },
  button: {
    outline: 'none',
    background: 'none',
    border: 0,
    color: '#888',
    fontSize: 15,
    width: 60,
    margin: '10px 0 0',
    cursor: 'pointer',
  },
  input: {
    margin: 0,
    fontSize: 18,
    lineHeight: 18,
    height: 18,
    padding: 10,
    border: '1px solid #ddd',
    background: '#fff',
    borderRadius: 6,
    color: '#888',
  },
  label: {
    paddingRight: 10,
  },
};
