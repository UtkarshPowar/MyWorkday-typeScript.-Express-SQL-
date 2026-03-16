import { useEffect, useState } from "react"
import axios from "axios"
import { Pencil, Trash } from "lucide-react"
import type { User } from "./types"

const API = "http://localhost:5000"

export function UserTab() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [users, setUsers] = useState<User[]>([])
    const [editUser, setEditUser] = useState<any>(null)
    const [showModal, setShowModal] = useState(false)

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API}/users`)
            setUsers(res.data)
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    const addUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${API}/users`, { firstName, lastName, email, contactNumber })
            setFirstName("")
            setLastName("")
            setEmail("")
            setContactNumber("")
            fetchUsers()
        } catch (error) {
            console.error("Error adding user:", error)
        }
    }

    const deleteUser = async (id: number) => {
        if (!window.confirm("Are you sure?")) return
        try {
            await axios.delete(`${API}/users/${id}`)
            fetchUsers()
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }

    const updateUser = async () => {
        try {
            await axios.put(`${API}/users/${editUser.id}`, editUser)
            setShowModal(false)
            fetchUsers()
        } catch (error) {
            console.error("Update failed", error)
        }
    }

    useEffect(() => { fetchUsers() }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add User</h2>
                <form onSubmit={addUser} className="grid grid-cols-4 gap-4 mb-8">
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-4 py-2" />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-4 py-2" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-4 py-2" />
                    <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-4 py-2" />
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">Add</button>
                </form>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">User List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Full Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Contact</th>
                                <th className="p-3 text-left">Created At</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.Id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{user.Id}</td>
                                    <td className="p-3">{user.FullName}</td>
                                    <td className="p-3">{user.Email}</td>
                                    <td className="p-3">{user.ContactNumber}</td>
                                    <td className="p-3">{new Date(user.CreatedAt).toLocaleString()}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <Pencil className="cursor-pointer" size={20} onClick={() => {
                                                const names = user.FullName.split(" ")
                                                setEditUser({ id: user.Id, firstName: names[0], lastName: names[1] || "", email: user.Email, contactNumber: user.ContactNumber })
                                                setShowModal(true)
                                            }} />
                                            <Trash className="cursor-pointer" size={20} onClick={() => deleteUser(user.Id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-[400px]">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <div className="flex flex-col gap-3">
                            <input value={editUser.firstName} onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })} className="border p-2 rounded" />
                            <input value={editUser.lastName} onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })} className="border p-2 rounded" />
                            <input value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} className="border p-2 rounded" />
                            <input value={editUser.contactNumber} onChange={(e) => setEditUser({ ...editUser, contactNumber: e.target.value })} className="border p-2 rounded" />
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
                            <button onClick={updateUser} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}