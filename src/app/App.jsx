import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Todo = ({ todo }) => <div className="todo">{todo.text}</div>;

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

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            index={todo.id}
            todo={todo}
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

TodoForm.propTypes = {
  addTodo: PropTypes.string.isRequired,
};

Todo.propTypes = {
  todo: PropTypes.string.isRequired,
};

export default App;
