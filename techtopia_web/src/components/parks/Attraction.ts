export interface Attraction{
    id: number;
    parkUUID: string;
    name: string;
    image: string;
    positionX: string;
    positionY: string;
}

export type AttractionData = Omit <Attraction , 'id'|'parkUUID'>