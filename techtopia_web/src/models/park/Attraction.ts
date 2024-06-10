export interface Attraction{
    parkAttractionId: number;
    parkID: string;
    name: string;
    image: string;
    positionX: string;
    positionY: string;
}

export type AttractionData = Omit <Attraction , 'id'|'parkID'>