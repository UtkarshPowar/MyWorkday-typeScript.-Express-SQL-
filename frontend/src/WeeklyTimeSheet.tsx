import { useState } from "react";
import axios from "axios";
import type { Task } from "./types";


const WeeklyTimeSheet = () => {

    const API = "http://localhost:5000"

    const [date, setDate] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async (selectedDate: string) => {
        try {
            const res = await axios.get(`${API}/weekly-tasks?date=${selectedDate}`);
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-10">
            <h2 className="text-2xl font-bold mb-6">
                Weekly Timesheet
            </h2>
            <input
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value)
                    fetchTasks(e.target.value)
                }}
                className="border px-4 py-2 rounded mb-6"
            />
            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Employee</th>
                        <th className="p-3 text-left">Activity</th>
                        <th className="p-3 text-left">Ticket</th>
                        <th className="p-3 text-left">Hours</th>
                        <th className="p-3 text-left">Minutes</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.TaskId}>
                            <td className="p-3">{new Date(task.Date).toLocaleDateString()}</td>
                            <td className="p-3">{task.EmployeeName}</td>
                            <td className="p-3">{task.Activity}</td>
                            <td className="p-3">{task.TicketId}</td>
                            <td className="p-3">{task.Hours}</td>
                            <td className="p-3">{task.Minutes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WeeklyTimeSheet;