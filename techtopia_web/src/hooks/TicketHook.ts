import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Ticket } from "../models/ticket/Ticket";
import {
    GetTicket,
    GetTicketTypes,
    GetTickets,
} from "../services/ticket/TicketService";
import SecurityContexts from "../security/contexts/SecurityContexts";

// This function is used to fetch data with useQuery from the api endpoint
export function useTicket(id: string | undefined) {
    const { token } = useContext(SecurityContexts)

    const {
        isLoading,
        isError,
        data: ticket,
    } = useQuery(
        ["item", id],
        async () => {
            const result = await GetTicket(id, token);
            return result;
        },
        { enabled: !!id } // optional: enable the query only when id is defined
    );

    return {
        isLoading,
        isError,
        ticket,
    };
}
export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]); // Initializing parks state with an empty array
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { token } = useContext(SecurityContexts)

    useEffect(() => {
        async function fetchTicket() {
            try {
                const data = await GetTickets(token);
                setTickets(data); // Updating the parks state with the fetched data
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchTicket();
    }, [token]);

    return {
        isLoading,
        isError,
        tickets: tickets,
    };
}

export function useTicketTypes() {
    const [ticketTypes, setTicketTypes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { token } = useContext(SecurityContexts)
    useEffect(() => {
        const fetchTicketTypes = async () => {
            try {
                const types = await GetTicketTypes(token);
                setTicketTypes(types);
            } catch {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicketTypes();
    }, [token]);

    return { isLoading, hasError, ticketTypes };
}

export function usePurchaseTicket() { }

export function useScanTicket() { }
