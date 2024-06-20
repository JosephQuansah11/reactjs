import { Alert, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useAttractions, useAttractionsFromParkId, useParks } from "../../hooks/ParkHook"
import { Attraction } from "../../models/park/Attraction"
import Loader from "../Loader"
import { AttractionPark } from "./AttractionPark"
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react"


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
                alignItems: 'center',
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


export function GetAttractionData(parkId: string) {
    const { attractions } = useAttractionsFromParkId(parkId);
    return attractions;
}

export function ShowAllParkAttractions() {
    const { isLoading, isError, parks } = useParks();
    const navigate = useNavigate();


    if (isError) {
        return <Alert style={{
            width: '100%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'blue',
            fontSize: '0.85rem',
            margin: '0',
            padding: '0'
        }} severity="error">park could not be loaded! There's no park in the server</Alert>;
    }

    if (isLoading || !parks) {
        return (
            <CircularProgress sx={{ display: "block", mt: "10em", mx: "auto" }} />
        );
    }
    return (
        <div style={{
            width: '100%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'blue',
            fontSize: '0.85rem',
            margin: '0',
            padding: '0'
        }} className="parks">
            <SearchAttractions />
            {parks.map(park => (
                <div key={park.id}>
                    <h2>{park.name}</h2>
                    {park.parkAttractions.map(attraction => (
                        <Card
                            sx={{ width: 350, m: 1, backgroundColor: "#f5f5f5" }}
                            onClick={() => navigate(`/attractions/${attraction.parkAttractionId}`)}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    alt={attraction.name}
                                    image={attraction.image}
                                />
                                <CardContent>
                                    <Typography variant="h4" component="div" sx={{ fontFamily: "handwritten", textAlign: "center" }}>
                                        {attraction.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
}



function SearchAttractions() {
    const { isLoading, isError, parks } = useParks();
    const [searchQuery, setSearchQuery] = useState('');
    const [mapId, setMapId] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    useEffect(() => {
        parks.map(park => {
            const filteredAttractions = park.parkAttractions.filter(attraction => attraction.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setMapId(filteredAttractions[0]?.parkID)
        })
    }, [searchQuery, parks, mapId])

    if (isError) {
        return <Alert style={{
            width: '100%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'blue',
            fontSize: '0.85rem',
            margin: '0',
            padding: '0'
        }} severity="error">park could not be loaded! There's no park in the server</Alert>;
    }

    if (isLoading || !parks) {
        return (
            <CircularProgress sx={{ display: "block", mt: "10em", mx: "auto" }} />
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
                label="Search Attractions"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ m: 2 }}
            />
            <Button variant="contained" onClick={() => navigate(`/map/${mapId}`)}>Search</Button>
        </Box>
    )

}
