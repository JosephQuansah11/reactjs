import { Attraction } from "./Attraction";

export interface Park{
    name: string;
    id: string;
    image: string;
    entranceGateId: string;
    exitGateId: string;
    parkAttractions: Attraction[];
}

export type ParkFormData ={
    name: string,
    image: string,
    entranceGateId: string,
    exitGateId: string
}

export type ParkForm = Omit<ParkFormData, 'id'>