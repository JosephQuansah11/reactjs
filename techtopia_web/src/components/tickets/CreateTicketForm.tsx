import { Button, Card, CardMedia, Container } from "@mui/material";
import { AddTicket, DeleteTicket } from "../../services/ticket/TicketService";
import SecurityContext from '../../security/contexts/SecurityContexts.ts';
import { useContext } from "react";



function CreateMultiPassTickets() {
    const {token} = useContext(SecurityContext);
    const image = '/src/images/multipass_ticket.png'
    return (
        <Card sx={{ width: '30rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center' }}>
            <CardMedia
                component="img"
                height="70%"
                width="90%"
                image={image}
            />
            <div  style={{display:"flex", flexDirection: "row", justifyContent: "space-around", width: "100%"}}>
                <Button onClick={() => create10Tickets("multi_day_pass".toUpperCase(), token)}>Create +10 Tickets</Button>
                <Button onClick={() => remove10Tickets("multi_day_pass".toUpperCase(), token)}>Reduce -10 Tickets</Button>
            </div>
        </Card>
    )
}

function create10Tickets(ticketType: string, token: string | undefined){
    for (let index = 0; index < 10; index++) {
        AddTicket(ticketType, token);
    }
}

function remove10Tickets(ticketType: string, token: string | undefined){
    for (let index = 0; index < 10; index++) {
        DeleteTicket(ticketType, token);
    }
}


function CreateSinglePassTickets() {
    const {token} = useContext(SecurityContext);

    const image = '/src/images/singlepass_ticket.png'
    return (
        <Card sx={{ width: '25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center' }}>
            <CardMedia
                component="img"
                height="70%"
                width="90%"
                image={image}
            />
            <div style={{display:"flex", flexDirection: "row", justifyContent: "space-around", width: "100%"}}>
                <Button onClick={() => create10Tickets("single_day_pass".toUpperCase(), token)}>Create +10 Tickets</Button>
                <Button onClick={() => remove10Tickets("single_day_pass".toUpperCase(), token)}>Reduce -10 Tickets</Button>
            </div>
        </Card>
    )
}

export function CreateTicketForm() {
    return (
        <Container>
            <h1>Create Tickets</h1>
            <div style={{ width: '100%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '2rem' }}>
                <CreateMultiPassTickets />
                <CreateSinglePassTickets />
            </div>
        </Container>

    )
}   