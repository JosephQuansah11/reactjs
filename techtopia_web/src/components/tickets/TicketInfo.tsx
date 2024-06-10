import { useNavigate, useParams } from "react-router-dom";
import { useTicket } from "../../hooks/TicketHook";


export function ShowTicketInfo(){
    const params  = useParams();
    const ticket = useTicket(params.id);
    const navigate = useNavigate();
    return (
        <div>
            <h1>Ticket Info</h1>
            <table style={{ width: '100%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <tbody>
                    <tr>
                        <th>Ticket id</th>
                        <td>{ticket.ticket?.id}</td>
                    </tr>
                    <tr>
                        <th>Ticket user</th>
                        <td>{ticket.ticket?.username}</td>
                    </tr>
                    <tr>
                        <th>Ticket valid start date</th>
                        <td>{ticket.ticket?.validityStartDate}</td>
                    </tr>
                    <tr>
                        <th>Ticket valid end date</th>
                        <td>{ticket.ticket?.validityEndDate}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => navigate(`/parks`)}>Proceed</button>
        </div>
    );
}