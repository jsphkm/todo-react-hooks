import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Todo = ({ todo, completeTodo, removeTodo }) => (
  <div
    className="todo"
    style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    key={todo.id}
  >
    {todo.text}
    <div>
      <button type="button" onClick={() => completeTodo(todo.id)}>Complete</button>
      <button type="button" onClick={() => removeTodo(todo.id)}>x</button>
    </div>
  </div>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string,
    isCompleted: PropTypes.bool,
    id: PropTypes.number,
  }),
  completeTodo: PropTypes.func,
  removeTodo: PropTypes.func,
};

Todo.defaultProps = {
  todo: { text: '', isCompleted: false, id: 0 },
  completeTodo: () => null,
  removeTodo: () => null,
};

const App = () => {
  const [todos, setTodos] = React.useState([
    {
      text: 'Learn about React',
      isCompleted: false,
      id: 8928947,
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false,
      id: 357893503,
    },
    {
      text: 'Build a todo app',
      isCompleted: false,
      id: 9848943935,
    },
  ]);

  const addTodo = (text) => {
    const randNum = Math.floor(Math.random() * 1000000);
    const newTodos = [...todos, { text, isCompleted: false, id: randNum }];
    setTodos(newTodos);
  };

  const completeTodo = (idx) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i += 1) {
      if (newTodos[i].id === idx) {
        newTodos[i].isCompleted = !newTodos[i].isCompleted;
        break;
      }
    }
    setTodos(newTodos);
  };

  const removeTodo = (idx) => {
    const newTodos = [...todos];
    let spliceIdx;
    for (let i = 0; i < newTodos.length; i += 1) {
      if (newTodos[i].id === idx) {
        spliceIdx = i;
      }
    }
    newTodos.splice(spliceIdx, 1);
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
            completeTodo={completeTodo}
            removeTodo={removeTodo}
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
  addTodo: PropTypes.func.isRequired,
};

export default App;
