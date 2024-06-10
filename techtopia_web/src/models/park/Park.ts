import { Attraction } from "./Attraction";

export interface Park{
    name: string;
    id: string;
    image: string;
    attractions: Attraction[];
}