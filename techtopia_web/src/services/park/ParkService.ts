import axios from 'axios';
import { Attraction, AttractionFormData } from '../../models/park/Attraction';
import { getKeycloakToken } from "../../models/CustomKeycloak.ts";
import { Park, ParkForm } from '../../models/park/Park';

const base_url = `http://localhost:8092/park_api`
export async function getParkAttractions(id: string){
    const attractions = await axios.get<Attraction[]>(`${base_url}/${id}/attractions`);
    return attractions.data
}

export async function getAttraction(id: string){
    const attractions = await axios.get<Attraction[]>(`${base_url}/attractions/${id}`);
    return attractions.data
}


export async function getParks(){
    const parks = await axios.get<Park[]>(`${base_url}/parks`);
    return parks.data
}

export function addParkAndAttraction(attraction: Omit<AttractionFormData, 'parkAttractionId'>){
    return axios.post(`${base_url}/add_attraction`, [attraction]);
}

export function addPark(park: Omit<ParkForm, 'parkId'>, entranceGateId: string | undefined, exitGateId: string | undefined, authToken: string | undefined) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    return axios.post(`${base_url}/create-park/with_gate/${entranceGateId}/${exitGateId}`, park, config);
}


export function deleteParkAttraction(id:string,  authToken: string | undefined) {
    const config = {
        headers: getKeycloakToken(authToken),
    };
    return axios.delete(`${base_url}/parkManager/deleteAttraction/${id}`, config);
}