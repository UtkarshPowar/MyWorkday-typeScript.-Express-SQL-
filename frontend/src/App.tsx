import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"
import { Navbar } from "./Navbar"
import { UserTab } from "./UserTab"
import { ProjectTab } from "./ProjectTab"
import { TicketTab } from "./TicketTab"
import TaskTab from "./TaskTab"
import WeeklyTimeSheet from "./WeeklyTimeSheet"
import type { Project } from "./types"
import Dashboard from "./DashBoard"

function App() {

    const [activeTab, setActiveTab] = useState<"HOME" | "PROJECTS" | "TICKETS" | "TASKS" | "WEEKLY TIMESHEET" | "USER">("HOME")
    const [projects, setProjects] = useState<Project[]>([])
    const API = "http://localhost:5000"

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API}/projects`)
            setProjects(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className=""> {/* max-w-6xl mx-auto p-10 */}
                
                {activeTab === "HOME" && <Dashboard />}
                
                {/* {activeTab === "HOME" && (
                    <div
                        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${workspace})`
                        }}
                    >
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="relative bg-amber-500/40 backdrop-blur-md rounded-xl p-10 max-w-3xl text-center text-white shadow-xl">
                            <h1 className="text-4xl font-bold mb-4">
                                Welcome to My Workday
                            </h1>
                        </div>
                    </div>
                )} */}

                {activeTab === "PROJECTS" && <ProjectTab projects={projects} onRefresh={fetchProjects} />}
                {activeTab === "TICKETS" && <TicketTab projects={projects} />}
                {activeTab === "TASKS" && <TaskTab />}
                {activeTab === "WEEKLY TIMESHEET" && <WeeklyTimeSheet />}
                {activeTab === "USER" && <UserTab />}
            </div>
        </div >
    )
}

export default App