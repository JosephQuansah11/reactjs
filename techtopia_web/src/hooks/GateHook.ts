import {  useQuery } from "@tanstack/react-query";
import { showGates } from "../services/gate/GateService";

export function useShowGates() {
    const {
        isLoading,
        isError,
        data: gates,
    } = useQuery(["gates"], () => showGates())
    return {
        isLoading,
        isError,
        gates,
    };
}
