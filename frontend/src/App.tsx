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
            <div>
                {activeTab === "HOME" && <Dashboard />}
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