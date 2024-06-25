import {Ticket, TicketFormData} from '../../models/ticket/Ticket'
import axios from 'axios'

export async function getTicket(id: string|undefined) {
    const tickets = await axios.get<Ticket>(`http://localhost:8091/ticket_api/tickets/retrieve/ticket/${id}`);
    return tickets.data
}

export async function getTicketTypes(){
    const tickets = await axios.get<string[]>(`http://localhost:8091/ticket_api/tickets/ticketTypes`);
    return tickets.data
}

export async function getTickets(){
    const tickets = await axios.get<Ticket[]>(`http://localhost:8091/ticket_api/tickets/showAllTickets`);
    return tickets.data
}


export async function scanTicket(ticket_type: string|undefined){
    const response = await axios.post(`http://localhost:8091/ticket_api/tickets/create/ticket_type/${ticket_type}`);
    return response.data;
}

export async function printTicket(ticket: TicketFormData){
    const response = await axios.get(`http://localhost:8091/ticket_api/tickets/showAllTickets`);
    console.log(ticket.formTicketId)
    return response.data
}

