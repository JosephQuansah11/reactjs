import axios from "axios";
import { getKeycloakToken } from "../../models/CustomKeycloak.ts";

export async function createGate(authToken: string | undefined){
    const config = {
        headers: getKeycloakToken(authToken),
    };
    await axios.post(
        `http://localhost:8093/gate_api/initialiseGate`,
        config
    );
}

export async function showGates(){
    const gatesAvailable = await axios.get(
        `http://localhost:8093/gate_api/gates`
    );
    return gatesAvailable.data;
}


//TODO: this is to help me get the ticket users from the gate and compare with keycloak logged in user id
// if the ticket user id matches with the keycloak logged in user id
// then allow them to use the gate, find ticket information and also find the park attractions otherwise deny access

export async function getTicketUsersIdFromGate(authToken: string | undefined, parkId: string | undefined) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    const ticketUserId = await axios.get(
        `http://localhost:8093/gate_api/${parkId}`,
        config
    );
    return ticketUserId.data;
}