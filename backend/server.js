const express = require("express")
const cors = require("cors")
const sql = require("mssql")

const app = express()

app.use(cors())
app.use(express.json())

const config = {
    user: "admin",
    password: "qwerty@123",
    server: "localhost",
    database: "UserManagement",
    port: 1433,
    options: {
        trustServerCertificate: true
    }
}

sql.connect(config)
    .then(() => console.log("Connected to SQL Server"))
    .catch(err => console.log(err))

app.get("/users", async (req, res) => {
    try {
        const result = await sql.query("SELECT Id, FullName, Email, ContactNumber, CreatedAt FROM Users")
        res.json(result.recordset)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post("/users", async (req, res) => {
    const { firstName, lastName, email, contactNumber } = req.body
    if (!firstName || !lastName || !email || !contactNumber) {
        return res.status(400).send("First Name, Last Name and Email required")
    }
    try {
        await sql.query`
            INSERT INTO Users (FirstName, LastName, Email, ContactNumber)
            VALUES (${firstName}, ${lastName}, ${email}, ${contactNumber})
        `;
        res.send("User Added")
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        await sql.query`
            DELETE FROM Users
            WHERE Id = ${id}
        `;
        res.send("User Deleted")
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.put("/users/:id", async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, contactNumber } = req.body
    try {
        await sql.query`
            UPDATE Users
            SET FirstName = ${firstName}, LastName = ${lastName}, Email = ${email}, ContactNumber = ${contactNumber}
            WHERE Id = ${id}
        `;
        res.send("User Updated")
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get("/projects", async (req, res) => {
    const result = await sql.query("SELECT * FROM Projects")
    res.json(result.recordset)
})

app.post("/projects", async (req, res) => {
    const { projectName, status } = req.body
    await sql.query`
        INSERT INTO Projects (ProjectName, Status)
        VALUES (${projectName}, ${status})
    `
    res.send("Project added")
})

app.get("/tickets", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM Tickets")
        res.json(result.recordset)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post("/tickets", async (req, res) => {
    const { projectName, ticketDescription, ticketStatus } = req.body
    try {
        await sql.query`
        INSERT INTO Tickets (ProjectName, TicketDescription, TicketStatus)
        VALUES (${projectName}, ${ticketDescription}, ${ticketStatus})
        `
        res.send("Ticket added")
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get("/tasks", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM Tasks ORDER BY Date DESC")
        res.json(result.recordset)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post("/tasks", async (req, res) => {
    const {
        Date,
        EmployeeName,
        Activity,
        TicketId,
        TaskDescription,
        Hours,
        Minutes,
        TaskStatus
    } = req.body

    try {
        await sql.query`
        INSERT INTO Tasks 
        (Date, EmployeeName, Activity, TicketId, TaskDescription, Hours, Minutes, TaskStatus)
        VALUES 
        (${Date}, ${EmployeeName}, ${Activity}, ${TicketId}, ${TaskDescription}, ${Hours}, ${Minutes}, ${TaskStatus})
        `
        res.send("Task added")
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get("/weekly-tasks", async (req, res) => {
    const { date } = req.query
    try {
        const result = await sql.query`
            SELECT *
            FROM Tasks
            WHERE Date >= DATEADD(DAY, -DATEPART(WEEKDAY, ${date}) + 2, ${date})
            AND Date <= DATEADD(DAY, 8 - DATEPART(WEEKDAY, ${date}), ${date})
            ORDER BY Date
            `
        res.json(result.recordset)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get("/dashboard", async (req, res) => {
    try {

        const users = await sql.query`SELECT COUNT(*) AS totalUsers FROM Users`
        const projects = await sql.query`SELECT COUNT(*) AS totalProjects FROM Projects`
        const tickets = await sql.query`SELECT COUNT(*) AS totalTickets FROM Tickets`

        const hours = await sql.query`
            SELECT 
                ISNULL(SUM(Hours),0) AS totalHours,
                ISNULL(SUM(Minutes),0) AS totalMinutes
            FROM Tasks
        `

        res.json({
            totalUsers: users.recordset[0].totalUsers,
            totalProjects: projects.recordset[0].totalProjects,
            totalTickets: tickets.recordset[0].totalTickets,
            totalHours: hours.recordset[0].totalHours,
            totalMinutes: hours.recordset[0].totalMinutes
        })

    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})