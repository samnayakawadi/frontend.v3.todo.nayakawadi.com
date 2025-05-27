import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const priorities = ['Low', 'Medium', 'High'];

export default function TodoChatGPT() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  const [darkMode, setDarkMode] = useState(false);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTodo = {
      id: editingId || uuid(),
      ...form,
      completed: false,
    };

    if (editingId) {
      setTodos((prev) => prev.map((todo) => (todo.id === editingId ? newTodo : todo)));
    } else {
      setTodos((prev) => [...prev, newTodo]);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate,
    });
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">📝 Todo Application</h1>
            <button
              onClick={toggleDarkMode}
              className="bg-gray-800 text-white px-3 py-1 rounded dark:bg-gray-200 dark:text-black"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                type="date"
                className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <textarea
              placeholder="Description"
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <select
              className="p-2 rounded border w-full dark:bg-gray-700 dark:border-gray-600"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
            >
              {editingId ? 'Update Todo' : 'Add Todo'}
            </button>
          </form>

          <div className="space-y-4">
            {todos.length === 0 && (
              <p className="text-center text-gray-500">No todos added yet.</p>
            )}
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border-l-4 ${
                  todo.priority === 'High'
                    ? 'border-red-500'
                    : todo.priority === 'Medium'
                    ? 'border-yellow-500'
                    : 'border-green-500'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className={`text-xl font-semibold ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.title}
                  </h2>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      todo.priority === 'High'
                        ? 'bg-red-100 text-red-600'
                        : todo.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    } dark:bg-opacity-30`}
                  >
                    {todo.priority}
                  </span>
                </div>
                <p className="mb-2">{todo.description}</p>
                {todo.dueDate && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`px-3 py-1 rounded ${
                      todo.completed
                        ? 'bg-gray-500 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {todo.completed ? 'Completed' : 'Mark Complete'}
                  </button>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
