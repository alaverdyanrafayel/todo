import React, { Component } from "react";
import uuid from "uuid/v4";

export class TodoForm extends Component {
  state = {
    title: ""
  };

  titleChangeHandler = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  clearInput = () => {
    this.setState({ title: "" });
  };

  submitFormHandler = event => {
    event.preventDefault();
    const id = uuid();
    const { title } = this.state;
    this.props.addTodoHandler({ id, title, completed: false }, this.clearInput);
  };

  render() {
    const { title } = this.state;
    return (
      <div style={styles.container}>
        <form onSubmit={this.submitFormHandler} autoComplete="off">
          <label htmlFor="new-task" style={styles.label}>
            Add Todo
          </label>
          <input
            id="new-task"
            value={title}
            onChange={this.titleChangeHandler}
            style={styles.input}
          />
          <button
            type="button"
            onClick={this.submitFormHandler}
            style={styles.button}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "400"
  },
  button: {
    outline: "none",
    background: "none",
    border: 0,
    color: "#888",
    fontSize: 15,
    width: 60,
    margin: "10px 0 0",
    cursor: "pointer"
  },
  input: {
    margin: 0,
    fontSize: 18,
    lineHeight: 18,
    height: 18,
    padding: 10,
    border: "1px solid #ddd",
    background: "#fff",
    borderRadius: 6,
    color: "#888"
  },
  label: {
    paddingRight: 10
  }
};
