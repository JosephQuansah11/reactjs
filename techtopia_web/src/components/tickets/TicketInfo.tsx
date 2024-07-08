import { useNavigate, useParams } from "react-router-dom";
import { useTicket } from "../../hooks/TicketHook";

//TODO: Add ticket type
export function ShowTicketInfo(){
    const params  = useParams();
    const ticket = useTicket(params.id);
    const username = params.username;
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
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
                        <td>{username}</td>
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
            <button onClick={() => navigate(`/map/${id}`)}>Proceed</button>
        </div>
    );
}