import { Button, DialogActions } from '@mui/material';
import SecurityContexts from "../../security/contexts/SecurityContexts";
import { useCallback, useContext } from "react";
import { employTicketAgent } from "../../services/ticket/TicketService";
import { useNavigate, useParams } from "react-router-dom";

export function TicketAgent() {
    const { token } = useContext(SecurityContexts)
    const navigate = useNavigate();
    const params = useParams();
    const parkId = params.id;
    const handleTicketAgentSubmission = useCallback((token: string | undefined) => {
        employTicketAgent(token).then(response => {
                const ticketAgentId = response;
                navigate(`/park/${parkId}/tickets/${ticketAgentId}`);
            }).catch(error => {
                console.log("Error:", error);
            });
    }, [navigate, parkId]);

    return (
        <div>
            <h1>Ticket Agent</h1>
            <DialogActions style={{ background: 'black', color: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => handleTicketAgentSubmission(token)} style={{ backgroundColor: 'orange', color: 'black', fontWeight: 'bold', fontSize: '0.75rem' }}>
                    Employ Agent
                </Button>
            </DialogActions>
        </div>
    )
}