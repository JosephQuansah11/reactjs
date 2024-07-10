import { Attraction } from "./Attraction";

export interface Park{
    name: string;
    id: string;
    image: string;
    gateId: string;
    parkAttractions: Attraction[];
}

export type ParkFormData ={
    name: string,
    image: string,
    gateId: string
}

export type ParkForm = Omit<ParkFormData, 'id'>