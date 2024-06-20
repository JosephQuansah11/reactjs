export type Ticket ={
    id: string,
    ticketType: string,
    validityEndDate:string,
    validityStartDate:string,
    username:string,
    price: number
}

export type TicketForm = {
    id:string;
    formTicketId: string;
    ticketType: string;
    username: string;
    children: string;
    grandparents: string;
    validityStartDate: string;
    validityEndDate: string;
    price: number;
};

export type TicketFormData = Omit <TicketForm, 'id'>;
