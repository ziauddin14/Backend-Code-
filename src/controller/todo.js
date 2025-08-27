const todos = [];

const addTodo = (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: Date.now(), title, description };
    todos.push(newTodo);
    return res.send({ message: "Todo added successfully", todo: newTodo });
};
const getTodos = (req, res) => {
    return res.send({ message: "Todos retrieved successfully", todos });
};
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
    if (todoIndex !== -1) {
        todos[todoIndex] = { id: parseInt(id), title, description };
        res.status(200).json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
};
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const filterTodo = todos.filter((todo) => todo.id !== id);
    res.send({ message: "Todo deleted successfully", todos: filterTodo });
};

export { addTodo, getTodos, updateTodo, deleteTodo };