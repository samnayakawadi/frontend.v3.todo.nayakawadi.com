const TodoRaw = () => {

    const stats = [
        {
            title: "Total",
            value: 10
        },
        {
            title: "Done",
            value: 1
        },
        {
            title: "Active",
            value: 9
        },
        {
            title: "Progress",
            value: "10%"
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

    return (
        <div className="border-4 border-red-500 w-full flex flex-col justify-center items-center py-4">
            <div className="flex flex-col justify-center items-center w-[80%] gap-4">
                {/* Stats */}
                <div className="grid grid-cols-4 max-md:grid-cols-2 w-full">
                    {stats.map((singleStat, index) => {
                        return <div className="basis-3/12" key={`Stats${index}`} className="flex flex-row justify-center items-center border-4 border-blue-500 h-full">
                            <div className="basis-3/12 text-center border-4 border-green-500 h-full">ICON</div>
                            <div className="basis-9/12 border-4 border-purple-500">
                                <div className="flex flex-col justify-center items-center">
                                    <div>{singleStat.title}</div>
                                    <div>{singleStat.value}</div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {/* Search, Select, New Todo Button */}
                <div className="flex flex-row justify-center items-center w-full gap-4">
                    <div className="basis-8/12">
                        <input placeholder="Type here" className="w-full" />
                    </div>
                    <div className="basis-2/12">
                        <select>
                            {Object.keys(prioritiesMap).map(singlePriority => {
                                return <option>{prioritiesMap[singlePriority]}</option>
                            })}
                        </select>
                    </div>
                    <div className="basis-2/12">
                        <button>
                            <div className="flex flex-row justify-center items-center">
                                <div>ICON</div>
                                <div>New Todo</div>
                            </div>
                        </button>
                    </div>
                </div>
                {/* Active and Completes Todos */}
                <div className="flex flex-row justify-center items-center w-full">
                    <div className="basis-8/12 w-full">
                        {/* Active Todos */}
                        <div className="flex flex-col justify-center items-start w-full">
                            <div>Active Tasks ({activeTasks.length})</div>
                            <div className="flex flex-col gap-4">
                                {activeTasks.map(singleActiveTask => {
                                    return <div className="flex flex-col justify-center items-start border p-4">
                                        <div>{singleActiveTask.title}</div>
                                        <div>{singleActiveTask.description}</div>
                                        <div className="flex flex-row gap-3">
                                            <div>{singleActiveTask.priority}</div>
                                            <div>{singleActiveTask.dueDate}</div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Completed Todos */}
                    <div className="basis-4/12">
                        <div className="flex flex-col justify-center items-start w-full">
                            <div>Completed Tasks ({completedTasks.length})</div>
                            <div className="flex flex-col gap-4">
                                {completedTasks.map(singleActiveTask => {
                                    return <div className="flex flex-col justify-center items-start border p-4">
                                        <div className="line-through">{singleActiveTask.title}</div>
                                        <div className="line-through">{singleActiveTask.description}</div>
                                        <div className="flex flex-row gap-3">
                                            <div>{singleActiveTask.priority}</div>
                                            <div>{singleActiveTask.dueDate}</div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoRaw