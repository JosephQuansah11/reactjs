import { useEffect, useState } from "react";
import {
    getTicket,
    getTicketTypes,
    getTickets,
} from "../services/ticket/TicketService";
import { useQuery } from "@tanstack/react-query";
import { Ticket } from "../models/ticket/Ticket";

// This function is used to fetch data with useQuery from the api endpoint
export function useTicket(id: string | undefined) {
    const {
        isLoading,
        isError,
        data: ticket,
    } = useQuery(
        ["item", id],
        async () => {
            const result = await getTicket(id);
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
    useEffect(() => {
        async function fetchTicket() {
            try {
                const data = await getTickets();
                setTickets(data); // Updating the parks state with the fetched data
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchTicket();
    }, []);

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

    useEffect(() => {
        const fetchTicketTypes = async () => {
            try {
                const types = await getTicketTypes();
                setTicketTypes(types);
            } catch {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicketTypes();
    }, []);

    return { isLoading, hasError, ticketTypes };
}

export function usePurchaseTicket() { }

export function useScanTicket() { }
