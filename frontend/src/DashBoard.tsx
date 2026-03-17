import { useEffect, useState } from "react"
import axios from "axios"
import workspace from "./assets/workspace.jpg"

function Dashboard() {

    const API = "http://localhost:5000"

    const [data, setData] = useState({
        totalUsers: 0,
        totalProjects: 0,
        totalTickets: 0,
        totalHours: 0,
        totalMinutes: 0
    })

    const fetchDashboard = async () => {
        try {
            const res = await axios.get(`${API}/dashboard`)
            setData(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    const totalTime =
        data.totalHours + Math.floor(data.totalMinutes / 60)

    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
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


            <h2 className="text-3xl font-bold mb-8">
                Dashboard
            </h2>

            <div className="grid grid-cols-4 gap-6 text-gray">
                <Card title="Users" value={data.totalUsers} />
                <Card title="Projects" value={data.totalProjects} />
                <Card title="Tickets" value={data.totalTickets} />
                <Card title="Hours Logged" value={totalTime} />
            </div>
        </div>
    )
}

function Card({ title, value }: { title: string, value: number }) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-gray-500 text-lg">{title}</h3>
            <p className="text-3xl font-bold mt-2 text-stone-900">
                {value}
            </p>
        </div>
    )
}

export default Dashboard