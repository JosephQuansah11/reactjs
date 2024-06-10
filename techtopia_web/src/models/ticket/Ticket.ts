export type Ticket ={
    id: string,
    ticketType: string,
    validityEndDate:string,
    validityStartDate:string,
    username:string
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
};

export type TicketFormData = Omit <TicketForm, 'id'>;
