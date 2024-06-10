
import { Attraction } from "../../models/park/Attraction";
import './Attraction.css'
`aa`

interface AttractionProp {
    attraction: Attraction;
}

export function AttractionPark({ attraction }: Readonly<AttractionProp>) {
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
        </div>
    )
}