import React from 'react';
import './App.css';
class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleSubmit = e => {
    const { inputValue } = this.state;
    const { addTodo } = this.props;

    // prevent the "click" default behavior
    e.preventDefault();

    // if there is no value, we should not do anything
    if (!inputValue) return;

    // call App's addTodo function with the current value and set the input field's state to empty string
    addTodo(inputValue);
    this.setState({inputValue: ""});
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
      </form>
    );
  }
}

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

class App extends React.Component {
  // declaration of the initial state

  constructor(props) {
    super(props);
    this.state = { todos: [
      { text: "Learn about React",
        isCompleted: false },
      { text: "Meet friend for lunch",
        isCompleted: false },
      { text: "Build really cool todo app",
        isCompleted: false }
    ] };
  }

  addTodo = text => {
    const { todos } = this.state;

    // using spread operator to add a new element to the state
    const newTodos = [...todos, { text }];
    this.setState({ todos: newTodos })
  };

  completeTodo = index => {
    const { todos } = this.state;

    // copy current state injto a variable
    const newTodos = [...todos];

    // changing a value in our variable
    newTodos[index].isCompleted = true;

    // setting the state equal to the variable
    this.setState({ todos: newTodos })
  };

  removeTodo = index => {
    const { todos } = this.state;

    const newTodos = [...todos];

    // cutting out 1 element from the array
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos })
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={this.completeTodo}
              removeTodo={this.removeTodo}
            />
          ))}
          <TodoForm addTodo={this.addTodo} />
        </div>
      </div>
    );
  }
}

export default App
