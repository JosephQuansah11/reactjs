import axios from "axios";
import { getKeycloakToken } from "../../models/CustomKeycloak.ts";
import { Ticket, TicketFormData } from "../../models/ticket/Ticket";

export async function GetTicket(
    id: string | undefined,
    authToken: string | undefined
) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const tickets = await axios.get<Ticket>(
        `http://localhost:8091/ticket_api/tickets/retrieve/ticket/${id}`,
        config
    );
    return tickets.data;
}

export async function GetTicketTypes(authToken: string | undefined) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const tickets = await axios.get<string[]>(
        `http://localhost:8091/ticket_api/tickets/ticketTypes`,
        config
    );
    return tickets.data;
}

export async function employTicketAgent(authToken: string | undefined) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const employedAgent = await axios.post(
        `http://localhost:8091/ticket_api/tickets/ticketAgent/employ`,
        config
    );
    return employedAgent.data;
}

export async function sellTicketToGuest(
    ticketId: string | undefined,
    ticketAgentId: string | undefined,
    authToken: string | undefined
) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const soldTicket = await axios.post(
        `http://localhost:8091/ticket_api/tickets/${ticketId}/ticketAgent/${ticketAgentId}`,
        config
    );
    return soldTicket.data;
}

export async function GetTickets(authToken: string | undefined) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const tickets = await axios.get<Ticket[]>(
        `http://localhost:8091/ticket_api/tickets/showAllTickets`,
        config
    );
    return tickets.data;
}

export async function AddTicket(
    ticket_type: string | undefined,
    authToken: string | undefined
) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const response = await axios.post(
        `http://localhost:8091/ticket_api/tickets/create/ticket_type/${ticket_type}`,
        config
    );
    return response.data;
}

export async function AddGuest(authToken: string | undefined) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const response = await axios.post(
        `http://localhost:8091/ticket_api/tickets/register/guest`,
        config
    );
    return response.data;
}

export async function ScanTicket(
    ticketUUID: string | undefined,
    parkGateUUID: string | undefined,
    authToken: string | undefined
) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const response = await axios.post(
        `http://localhost:8091/ticket_api/scanTicket/ticket/${ticketUUID}/gate/${parkGateUUID}`,
        config
    );
    return response.data;
}

export async function PrintTicket(
    ticket: TicketFormData,
    authToken: string | undefined
) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const response = await axios.get(
        `http://localhost:8091/ticket_api/tickets/showAllTickets`,
        config
    );
    console.log(ticket.formTicketId);
    return response.data;
}
