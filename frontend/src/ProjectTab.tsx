import { useState } from "react"
import axios from "axios"
import type { Project } from "./types"

const API = "http://localhost:5000"

interface ProjectTabProps {
    projects: Project[]
    onRefresh: () => void
}

export function ProjectTab({ projects, onRefresh }: ProjectTabProps) {
    const [projectName, setProjectName] = useState("")
    const [status, setStatus] = useState("")

    const addProject = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${API}/projects`, { projectName, status })
            setProjectName("")
            setStatus("")
            onRefresh()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Add Projects
                </h2>
                <form onSubmit={addProject} className="grid grid-cols-3 gap-4 mb-8">
                    
                    <input 
                        type="text" 
                        placeholder="Project Name" 
                        value={projectName} 
                        onChange={(e) => 
                            setProjectName(e.target.value)
                        } 
                        className="border rounded px-4 py-2" 
                    />
                    
                    <select  
                        value={status} 
                        onChange={(e) => 
                            setStatus(e.target.value)
                        } 
                        className="border rounded px-4 py-2" 
                    >
                        <option value="Select">Select</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Not Yet Started">Not Yet Started</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    
                    <button className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer">
                        Add Project
                    </button>

                </form>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Project List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Project Name</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.Id}>
                                    <td className="p-3">{project.Id}</td>
                                    <td className="p-3">{project.ProjectName}</td>
                                    <td className="p-3">{project.Status}</td>
                                    <td className="p-3">{new Date(project.CreatedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}