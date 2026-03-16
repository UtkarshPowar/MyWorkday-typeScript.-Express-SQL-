import { useEffect, useState } from "react"
import axios from "axios"
import type { Ticket, Project } from "./types"

const API = "http://localhost:5000"

interface TicketTabProps {
    projects: Project[]
}

export function TicketTab({ projects }: TicketTabProps) {
    const [projectNameTicket, setProjectNameTicket] = useState("")
    const [ticketDescription, setTicketDescription] = useState("")
    const [ticketStatus, setTicketStatus] = useState("")
    const [tickets, setTickets] = useState<Ticket[]>([])

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${API}/tickets`)
            setTickets(res.data)
        } catch (error) {
            console.error("Error fetching tickets:", error)
        }
    }

    const addTicket = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${API}/tickets`, { projectName: projectNameTicket, ticketDescription, ticketStatus })
            setProjectNameTicket("")
            setTicketDescription("")
            setTicketStatus("")
            fetchTickets()
        } catch (error) {
            console.error("Error adding ticket:", error)
        }
    }

    useEffect(() => { 
        fetchTickets() 
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Tickets</h2>
                <form onSubmit={addTicket} className="grid grid-cols-3 gap-4 mb-8">
                    <select value={projectNameTicket} onChange={(e) => setProjectNameTicket(e.target.value)} className="border rounded px-4 py-2">
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                            <option key={project.Id} value={project.ProjectName}>{project.ProjectName}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Ticket Description" value={ticketDescription} onChange={(e) => setTicketDescription(e.target.value)} className="border rounded px-4 py-2" />
                    <input type="text" placeholder="Ticket Status" value={ticketStatus} onChange={(e) => setTicketStatus(e.target.value)} className="border rounded px-4 py-2" />
                    <button className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer">Add Ticket</button>
                </form>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Ticket List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr><th className="p-3 text-left">Created At</th><th className="p-3 text-left">Project Name</th><th className="p-3 text-left">Ticket ID</th><th className="p-3 text-left">Description</th><th className="p-3 text-left">Status</th></tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.TicketId}><td className="p-3">{new Date(ticket.CreatedAt).toLocaleString()}</td><td className="p-3">{ticket.ProjectName}</td><td className="p-3">{ticket.TicketId}</td><td className="p-3">{ticket.TicketDescription}</td><td className="p-3">{ticket.TicketStatus}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> 
        </div>
    )
}