import axios from 'axios';
import { Attraction } from '../../models/park/Attraction';
import { Park } from '../../models/park/Park';

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


export function addParkAndAttraction(attraction: Omit<Attraction, 'id'>){
    console.log(attraction)
    return axios.post(`${base_url}/attractions`, attraction);
}