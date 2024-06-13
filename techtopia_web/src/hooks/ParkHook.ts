import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Park } from "../models/park/Park";
import { addParkAndAttraction, getAttraction, getParkAttractions, getParks } from "../services/park/ParkService";
import {  AttractionFormData } from "../models/park/Attraction";

// This function is used to fetch data with useQuery from the api endpoint
export function useAttractionsFromParkId(parkId: string) {
    const {
        isLoading,
        isError,
        data: attractions,
    } = useQuery(["attractions", parkId], () => getParkAttractions(parkId));
    return {
        isLoading,
        isError,
        attractions,
    };
}

export function useAttractions(attractionId: string){
    const {
        isLoading,
        isError,
        data: attraction,
    } = useQuery(["attractions", attractionId], () => getAttraction(attractionId));
    return {
        isLoading,
        isError,
        attraction,
    };
}

export function useParks() {
    const [parks, setParks] = useState<Park[]>([]); // Initializing parks state with an empty array
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        async function fetchPark() {
        try {
            const data = await getParks();
            setParks( data); // Updating the parks state with the fetched data
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
        }

        fetchPark();
    }, []);

    return {
        isLoading,
        isError,
        parks,
    };
}


export function useAddParkAttractions(){
    const queryClient = useQueryClient()

    const {
        mutate: addItem,
        isLoading: isAddingItem,
        isError: isErrorAddingItem,
    } = useMutation((attraction: Omit<AttractionFormData, 'id'>) =>  addParkAndAttraction(attraction ), {
        onSuccess: () => {
            queryClient.invalidateQueries(['attractions'])
        },
    })

    return {
        addItem,
        isAddingItem,
        isErrorAddingItem,
    }
}


export function useParkAttractions(parkId: string) {
    const { isLoading, isError, attractions } = useAttractionsFromParkId(parkId)

    return {
        isLoading,
        isError,
        attractions
    }
}
