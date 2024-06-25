import axios from 'axios';
import { Attraction, AttractionFormData } from '../../models/park/Attraction';
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

export function addPark(park: Omit<ParkForm, 'parkId'>){
    return axios.post(`${base_url}/create-park`, park);
}

//TODO: implement delete park
export function deletePark(id:string){
    return axios.delete(`${base_url}/delete-park/${id}`);
}