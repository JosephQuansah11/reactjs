import {
    Alert,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useParks } from "../../hooks/ParkHook";

export function ShowPark() {
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
        console.log(parks[0].image),
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
            {parks.map(({ id: id, name, image }) => (
                <Card
                    sx={{ width: 350, m: 1, backgroundColor: "#f5f5f5" }}
                    key={id}
                    onClick={() => navigate(`/map/${id}`)}
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="400"
                            image={image}
                            alt={name}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                sx={{ fontFamily: "handwritten", textAlign: "center" }}
                            >
                                {name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}

export default ShowPark;