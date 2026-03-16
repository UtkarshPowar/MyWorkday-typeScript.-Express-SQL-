import { useEffect, useState } from "react"
import axios from "axios"
import type { Task, User, Ticket } from "./types"

function TaskTab() {

    const API = "http://localhost:5000"

    const [users, setUsers] = useState<User[]>([])
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [tasks, setTasks] = useState<Task[]>([])

    const [date, setDate] = useState("")
    const [employeeName, setEmployeeName] = useState("")
    const [activity, setActivity] = useState("")
    const [ticketId, setTicketId] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [hours, setHours] = useState("")
    const [minutes, setMinutes] = useState("")
    const [taskStatus, setTaskStatus] = useState("")

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API}/users`)
            setUsers(res.data)
        } catch (error) {
            console.error("Error fetching users", error)
        }
    }

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${API}/tickets`)
            setTickets(res.data)
        } catch (error) {
            console.error("Error fetching tickets", error)
        }
    }

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${API}/tasks`)
            setTasks(res.data)
        } catch (error) {
            console.error("Error fetching tasks", error)
        }
    }

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${API}/tasks`, {
                Date: date,
                EmployeeName: employeeName,
                Activity: activity,
                TicketId: Number(ticketId),
                TaskDescription: taskDescription,
                Hours: Number(hours),
                Minutes: Number(minutes),
                TaskStatus: taskStatus
            })

            setDate("")
            setEmployeeName("")
            setActivity("")
            setTicketId("")
            setTaskDescription("")
            setHours("")
            setMinutes("")
            setTaskStatus("")

            fetchTasks()
        } catch (error) {
            console.error("Error adding task", error)
        }
    }

    useEffect(() => {
        fetchTasks()
        fetchUsers()
        fetchTickets()
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100">
            <div className="w-full max-w-7xl bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Add Task
                </h2>
                <form onSubmit={addTask} className="grid grid-cols-3 gap-4 mb-8">

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border px-4 py-2 rounded"
                    />

                    <select
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >

                        <option value="">Select Employee</option>

                        {users.map(user => (
                            <option key={user.Id} value={user.FullName}>
                                {user.FullName}
                            </option>
                        ))}

                    </select>

                    <select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >
                        <option value="">Activity</option>
                        <option value="Bug fixing">Bug fixing</option>
                        <option value="Development">Development</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Documentation">Documentation</option>
                        <option value="Grooming">Groomimg</option>
                        <option value="Learning">Learning</option>
                        <option value="Leave">Leave</option>
                        <option value="Meetings">Meetings</option>
                        <option value="Other">Other</option>
                        <option value="POC">POC</option>
                        <option value="Test Case Writing">Test Case Writing</option>
                        <option value="Testing">Testing</option>
                        <option value="UnAssigned">UnAssigned</option>
                        <option value="Unit Testing">Unit Testing</option>
                    </select>
                        
                    <select
                        value={ticketId}
                        onChange={(e) => setTicketId(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >

                        <option value="">Select Ticket</option>

                        {tickets.map(ticket => (
                            <option key={ticket.TicketId} value={ticket.TicketId}>
                                Ticket {ticket.TicketId}
                            </option>
                        ))}

                    </select>

                    <input
                        placeholder="Task Description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="border px-4 py-2 rounded"
                    />

                    <input
                        type="number"
                        min={0}
                        max={23}
                        placeholder="Hours"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="border px-4 py-2 rounded"
                    />

                    <input
                        type="number"
                        min={0}
                        max={59}
                        placeholder="Minutes"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="border px-4 py-2 rounded"
                    />

                    <select
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >
                        <option value="Select">Select</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="UnderReview">Under Review</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">Deferred</option>    
                    </select>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Add Task
                    </button>

                </form>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Task List
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Employee</th>
                                <th className="p-3 text-left">Activity</th>
                                <th className="p-3 text-left">Task ID</th>
                                <th className="p-3 text-left">Ticket ID</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Hours</th>
                                <th className="p-3 text-left">Minutes</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.TaskId}>
                                    <td className="p-3">
                                        {new Date(task.Date).toLocaleDateString()}
                                    </td>
                                    <td className="p-3">{task.EmployeeName}</td>
                                    <td className="p-3">{task.Activity}</td>
                                    <td className="p-3">{task.TaskId}</td>
                                    <td className="p-3">{task.TicketId}</td>
                                    <td className="p-3">{task.TaskDescription}</td>
                                    <td className="p-3">{task.Hours}</td>
                                    <td className="p-3">{task.Minutes}</td>
                                    <td className="p-3">{task.TaskStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TaskTab