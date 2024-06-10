import { Alert } from "@mui/material"
import { useParams } from "react-router-dom"
import { useAttractions } from "../../hooks/ParkHook"
import { Attraction } from "../../models/park/Attraction"
import Loader from "../Loader"
import { AttractionPark } from "./AttractionPark"


export function ShowParkAttraction() {
    const { id } = useParams();

    const { isLoading, isError, attraction } = useAttractions(id!) //  see https://github.com/remix-run/react-router/issues/8200#issuecomment-962520661

    if (isLoading) return <Loader>We're loading your board</Loader>

    if (isError || !attraction) {
        return <Alert severity="error"
        style={{
            height: '80%',
            width: '100%',
            display: "flex",
            justifyContent: "center",
            alignItems :'center',
            textAlign: 'center',
            fontSize: '1.05rem',
            color: 'whitesmoke',
            backgroundColor: 'goldenrod',
            margin: '0',
            padding: '0'
        }
        }
        >Sorry we were not able to load your board</Alert>
    }
    return (
        <div>
            <AttractionPark attraction={attraction as unknown as Attraction} />
        </div>
    )
}