# Todo app with React State Hooks

# Issues
## Unique ID
Prevent usage of array index in keys, refer to the [eslint documentation](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

Instead, hard code the id values in `useState`
```js
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
```

Assign random whole integers when adding to the state
```js
const addTodo = (text) => {
  const randNum = Math.floor(Math.random() * 1000000);
  const newTodos = [...todos, { text, isCompleted: false, id: randNum }];
  setTodos(newTodos);
};
```

Then make sure to iterate through the array and check the id values in each objects when changing state values
```js
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
```

Also, assign unique id to all child elements of a list, including the component itself
```js
const App = () => {
  ...
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            index={todo.id}
            todo={todo}
            completeTodo={completeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
```

## Enforce PropTypes and [defaultProps](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md)

Enforce defaultProps when not a required prop
```js
Todo.defaultProps = {
  todo: { text: '', isCompleted: false, id: 0 },
  completeTodo: () => null,
};
```
> Note that the empty function is returning null, since [void](https://stackoverflow.com/questions/47438546/typescript-react-empty-function-as-defaultprops), cannot be the return value

Define propTypes and shapes
```js
Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string,
    isCompleted: PropTypes.bool,
    id: PropTypes.number,
  }),
  completeTodo: PropTypes.func,
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
```

