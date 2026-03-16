interface NavbarProps {
    activeTab: "HOME" | "PROJECTS" | "TICKETS" | "TASKS" | "WEEKLY TIMESHEET" | "USER"
    setActiveTab: (tab: "HOME" | "PROJECTS" | "TICKETS" | "TASKS" | "WEEKLY TIMESHEET" | "USER") => void
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
    return (
        <nav className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <h1 className="text-2xl font-semibold text-orange-200">My Workday</h1>
                <div className="flex items-center text-lg">
                    {(["HOME", "PROJECTS", "TICKETS", "TASKS", "WEEKLY TIMESHEET", "USER"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 pb-1 ${activeTab === tab
                                ? "text-white border-b-2 border-orange-200"
                                : "text-gray-300 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}