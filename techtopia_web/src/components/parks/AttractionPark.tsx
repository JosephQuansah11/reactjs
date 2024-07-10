
import { Attraction } from "../../models/park/Attraction";
import './Attraction.css'
import { deleteParkAttraction } from '../../services/park/ParkService.ts'
import SecurityContexts from "../../security/contexts/SecurityContexts";
import { useContext } from "react";

interface AttractionProp {
    attraction: Attraction;
}

export function AttractionPark({ attraction }: Readonly<AttractionProp>) {
    const { token } = useContext(SecurityContexts)

    const handleDelete = async () => {
        try {
            await deleteParkAttraction(attraction.parkAttractionId, token);
            alert("Attraction deleted successfully");
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className="attraction_container">
            <h2>{attraction.name}</h2>
            <div className="attraction">
                <img src={attraction.image} alt="" className="attraction_image" />
            </div>
            <p>
                {"Attraction id: " + attraction.parkAttractionId}
            </p>
            <p>{"Park associated with: " + attraction.parkID}</p>
            <p>
                {"Current Position Y on map: " + attraction.positionY}</p>
            <p>
                {"Current Position X on map: " + attraction.positionX}</p>
            <button type="button" onClick={() => handleDelete}>Delete</button>
        </div>
    )
}