import { useState } from 'react';
import { CheckCircle, Clock, Target, TrendingUp, Search, Plus, Calendar, Flag } from 'lucide-react';

const TodoRaw2ClaudeAI = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const stats = [
        {
            title: "Total",
            value: 10,
            icon: Target,
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Done",
            value: 1,
            icon: CheckCircle,
            color: "from-green-500 to-green-600"
        },
        {
            title: "Active",
            value: 9,
            icon: Clock,
            color: "from-orange-500 to-orange-600"
        },
        {
            title: "Progress",
            value: "10%",
            icon: TrendingUp,
            color: "from-purple-500 to-purple-600"
        }
    ]

    const activeTasks = [
        {
            title: "Grocery Shopping",
            description: "Buy milk, eggs, bread, and cheese.",
            priority: "Medium",
            dueDate: "5/27/2025"
        },
        {
            title: "Book Flight Tickets",
            description: "For the upcoming vacation to Bali.",
            priority: "High",
            dueDate: "5/27/2025"
        },
        {
            title: "Read React Documentation",
            description: "Study the latest React 18 features and hooks.",
            priority: "Low",
            dueDate: "5/27/2025"
        }
    ]

    const completedTasks = [
        {
            title: "Finish Project Proposal",
            description: "Complete the Nayakawadi Todo app proposal with detailed specifications.",
            priority: "High"
        }
    ]

    const prioritiesMap = {
        "all": "All Priorities",
        "high": "High Priorities",
        "medium": "Medium Priorities",
        "low": "Low Priorities",
    }

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    }

    return (
        <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Task Manager
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Stay organized and productive</p>
                    </div>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                        </span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {stats.map((singleStat, index) => {
                        const IconComponent = singleStat.icon;
                        return (
                            <div key={`Stats${index}`} className="group">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                {singleStat.title}
                                            </p>
                                            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                                {singleStat.value}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${singleStat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Search and Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                placeholder="Search tasks..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                        <div className="sm:w-48">
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                                {Object.keys(prioritiesMap).map(singlePriority => {
                                    return <option key={singlePriority}>{prioritiesMap[singlePriority]}</option>
                                })}
                            </select>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-medium">
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">New Todo</span>
                            <span className="sm:hidden">New</span>
                        </button>
                    </div>
                </div>

                {/* Tasks Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Tasks */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    Active Tasks ({activeTasks.length})
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {activeTasks.map((singleActiveTask, index) => {
                                    return (
                                        <div key={index} className="group p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-md bg-gray-50 dark:bg-gray-700/50">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                    {singleActiveTask.title}
                                                </h3>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                                                {singleActiveTask.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(singleActiveTask.priority)}`}>
                                                    <Flag className="w-3 h-3 mr-1" />
                                                    {singleActiveTask.priority}
                                                </span>
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {singleActiveTask.dueDate}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Completed Tasks */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    Completed ({completedTasks.length})
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {completedTasks.map((singleCompletedTask, index) => {
                                    return (
                                        <div key={index} className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-green-50 dark:bg-green-900/20 opacity-75">
                                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 line-through mb-2">
                                                {singleCompletedTask.title}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-3 leading-relaxed">
                                                {singleCompletedTask.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(singleCompletedTask.priority)} opacity-60`}>
                                                    <Flag className="w-3 h-3 mr-1" />
                                                    {singleCompletedTask.priority}
                                                </span>
                                                {singleCompletedTask.dueDate && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 opacity-60">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        {singleCompletedTask.dueDate}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoRaw2ClaudeAI