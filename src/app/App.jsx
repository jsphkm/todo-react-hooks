import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Todo = ({ todo, index, completeTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      key={index}
    >
      {todo.text}
      <div>
        <button type="button" onClick={() => completeTodo(index)}>Complete</button>
      </div>
    </div>
  );
};

// Todo.propTypes = {
//   todo: PropTypes.isRequired,
//   index: PropTypes.isRequired,
//   completeTodo: PropTypes.isRequired,
// };

const App = () => {
  const [todos, setTodos] = React.useState([
    {
      text: 'Learn about React',
      isCompleted: false,
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false,
    },
    {
      text: 'Build really cool todo app',
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    React.setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            index={index}
            todo={todo}
            completeTodo={completeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};

// TodoForm.propTypes = {
//   addTodo: PropTypes.isRequired,
// };

export default App;
