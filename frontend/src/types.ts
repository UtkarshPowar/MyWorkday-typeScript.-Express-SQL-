export interface User {
    Id: number
    FullName: string
    Email: string
    ContactNumber: string
    CreatedAt: string
}
export interface Project {
    Id: number
    ProjectName: string
    Status: string
    CreatedAt: string
}
export interface Ticket {
    TicketId: number
    ProjectName: string
    TicketDescription: string
    TicketStatus: string
    CreatedAt: string
}
export interface Task {
    Date: string
    EmployeeName: string
    Activity: string
    TaskId: number
    TicketId: number
    TaskDescription: string
    Hours: number
    Minutes: number
    TaskStatus: string
}