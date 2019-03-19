import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { matchPath } from "react-router";
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ""
    };
    this.myInput = React.createRef();
    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    /* this.toggleTodo = this.toggleTodo.bind(this); */
  }
  componentDidMount() {
    this.myInput.current.focus();
  }
  addTodo(event) {
    event.preventDefault();
    this.setState({
      newTodo: "",
      todos: [
        ...this.state.todos,
        {
          id: Math.random(),
          title: this.state.newTodo,
          done: false
        }
      ]
    });
  }

  handleChange(event) {
    this.setState({
      newTodo: event.currentTarget.value
    });
  }
  toggleTodo(todoId) {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id == todoId
          ? {
              ...todo,
              done: !todo.done
            }
          : todo
      )
    });
  }
  render() {
    const { todos, newTodo } = this.state;
    return (
      <form onSubmit={this.addTodo}>
        <input
          placeholder="Cosa dobbiamo fare?"
          onChange={this.handleChange}
          ref={this.myInput}
          value={newTodo}
        />
        <button type="submit">Salva</button>
        <h2>Todo</h2>
        <ul>
          {todos
            .filter(todo => !todo.done)
            .map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => this.toggleTodo(todo.id)}
                />
                {todo.title}
              </li>
            ))}
        </ul>
        <h2>Done</h2>
        <ul>
          {todos
            .filter(todo => todo.done)
            .map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => this.toggleTodo(todo.id)}
                />
                {todo.title}
              </li>
            ))}
        </ul>
      </form>
    );
  }
}
function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <ToDoList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
