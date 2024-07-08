import { Alert, Card, CardActionArea, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTicketTypes } from "../../hooks/TicketHook";

export function ShowTicketTypes() {
    const { isLoading, hasError, ticketTypes } = useTicketTypes();
    const navigate = useNavigate();
    const param = useParams();

    if (hasError) {
        return (
            <Alert severity='error'>error showing ticket types</Alert>
        );
    }

    if (isLoading || !ticketTypes) {
        return <CircularProgress sx={{}}></CircularProgress>
    }
    // replace images with actual images from ticktTypes
    const images = ['/src/images/singlepass_ticket.png', '/src/images/multipass_ticket.png'];
    const id = param.id;
    const ticketAgent = param.ticket_agent;
    return (
        <div style={{ width: '100%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center', width: '100%' }}>
                {ticketTypes.map((ticketType, index) => (
                    <Card key={ticketType} sx={{ height: '40%', textAlign: 'center' }}>
                        <CardActionArea sx={{ height: '90%', width: '100%', margin: 'auto', display: 'flex' }} onClick={() => {
                            navigate(`/park/${id}/purchase-form/${ticketType}/${ticketAgent}`)
                        }}>
                            <img src={`${images[index]}`} alt="" style={{ height: '95%' }} />
                        </CardActionArea>
                        {ticketType}
                    </Card>
                ))}
            </div>
        </div>
    )
}