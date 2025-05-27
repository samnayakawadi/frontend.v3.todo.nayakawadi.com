import { useState, useEffect, useMemo } from 'react';

// SVG Icons (Heroicons)
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.243.032 3.223.093" />
  </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a2.25 2.25 0 0 0-2.25 2.25c0 1.38.506 2.63 1.355 3.552A2.251 2.251 0 0 0 12 19.5a2.25 2.25 0 0 0 2.25-2.25c0-1.38-.506-2.63-1.355-3.552A2.251 2.251 0 0 0 12 12.75a2.25 2.25 0 0 0-2.25 2.25Z" />
    </svg>
);


const TodoGemini = () => {
  const initialFormState = { id: null, title: '', description: '', priority: 'medium', dueDate: '', completed: false };
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(initialFormState);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'priority'

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const openModal = (mode, todo = null) => {
    setModalMode(mode);
    if (mode === 'edit' && todo) {
      setCurrentTodo(todo);
    } else {
      setCurrentTodo(initialFormState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentTodo.title.trim() || !currentTodo.dueDate) return;

    if (modalMode === 'add') {
      setTodos([...todos, { ...currentTodo, id: Date.now() + Math.random().toString(36).substring(2, 9) }]);
    } else {
      setTodos(todos.map(todo => (todo.id === currentTodo.id ? currentTodo : todo)));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const priorityMap = {
    low: 1,
    medium: 2,
    high: 3,
  };

  const getPriorityColor = (priority, type = 'text') => {
    const colors = {
      low: { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-700', border: 'border-green-500' },
      medium: { text: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-700', border: 'border-yellow-500' },
      high: { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-700', border: 'border-red-500' },
    };
    return colors[priority]?.[type] || colors.medium[type];
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    // Make sure date is treated as local, not UTC
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };


  const filteredAndSortedTodos = useMemo(() => {
    let result = todos;

    // Filter by completion status
    if (filter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        return priorityMap[b.priority] - priorityMap[a.priority]; // Higher priority first
      }
      return 0;
    });

    return result;
  }, [todos, filter, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-800 dark:to-sky-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400 tracking-tight">My Tasks</h1>
          <div className="flex items-center space-x-4">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle dark mode"
            >
                {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => openModal('add')}
              className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <PlusIcon />
              <span className="ml-2 hidden sm:inline">Add Todo</span>
            </button>
          </div>
        </header>

        {/* Filters and Sort */}
        <div className="mb-6 p-4 bg-white dark:bg-slate-700 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label htmlFor="searchTerm" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Search</label>
                    <input
                        type="text"
                        id="searchTerm"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-800 dark:text-slate-200"
                    />
                </div>
                <div>
                    <label htmlFor="filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Filter by</label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-800 dark:text-slate-200"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort by</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-800 dark:text-slate-200"
                    >
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>
                 <button
                    onClick={() => openModal('add')}
                    className="sm:hidden w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <PlusIcon />
                    <span className="ml-2">Add New</span>
                  </button>
            </div>
        </div>


        {/* Todo List */}
        {filteredAndSortedTodos.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedTodos.map(todo => (
              <div
                key={todo.id}
                className={`
                  p-5 rounded-xl shadow-lg transition-all duration-300 
                  ${todo.completed ? 'bg-slate-200 dark:bg-slate-700 opacity-70' : 'bg-white dark:bg-slate-800'}
                  border-l-4 ${getPriorityColor(todo.priority, 'border')}
                `}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => toggleComplete(todo.id)} 
                            className={`p-1 rounded-full ${todo.completed ? 'text-green-500 dark:text-green-400' : 'text-slate-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400'}`}
                            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                           <CheckIcon/>
                        </button>
                        <h3 className={`text-xl font-semibold truncate ${todo.completed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-sky-700 dark:text-sky-400'}`}>
                        {todo.title}
                        </h3>
                    </div>
                    <p className={`mt-1 text-sm text-slate-600 dark:text-slate-300 break-words ${todo.completed ? 'line-through' : ''}`}>
                      {todo.description}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex flex-col sm:items-end space-y-2 sm:space-y-0 sm:space-x-3">
                     <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getPriorityColor(todo.priority, 'bg')} ${getPriorityColor(todo.priority, 'text')}`}>
                            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                        <span className={`text-xs ${todo.completed ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {formatDate(todo.dueDate)}
                        </span>
                     </div>
                     <div className="flex space-x-2 mt-2 sm:mt-0">
                        <button
                        onClick={() => openModal('edit', todo)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Edit todo"
                        >
                            <EditIcon />
                        </button>
                        <button
                        onClick={() => handleDelete(todo.id)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Delete todo"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-slate-100">No tasks</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Get started by creating a new task.</p>
            <div className="mt-6">
                <button
                onClick={() => openModal('add')}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                <PlusIcon />
                <span className="ml-2">New Task</span>
                </button>
            </div>
          </div>
        )}

        {/* Modal for Add/Edit Todo */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all">
              <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">
                {modalMode === 'add' ? 'Add New Todo' : 'Edit Todo'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={currentTodo.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    value={currentTodo.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:text-slate-100"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            value={currentTodo.priority}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:text-slate-100"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            value={currentTodo.dueDate}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:text-slate-100"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    {modalMode === 'add' ? 'Add Task' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoGemini;