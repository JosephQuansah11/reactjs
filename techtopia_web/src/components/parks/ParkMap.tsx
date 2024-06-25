import { Link, useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Fab } from "@mui/material";
import { useState } from 'react';
import { useAddParkAttractions, useParkAttractions } from '../../hooks/ParkHook';
import parkGate from '../../images/park-electric-gates.png';
import Loader from '../Loader';
import { AddAttractionDialog } from './AddAttractionForm';
import { CustomedMap } from './CustomedMap';
import './Map.css';
export default function ParkMap() {
    const width = '5rem';
    const height = '4rem';

    const { id } = useParams()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    //  see https://github.com/remix-run/react-router/issues/8200#issuecomment-962520661
    const { isLoading, isError, attractions } = useParkAttractions(id!)
    const { addItem, isAddingItem, isErrorAddingItem } = useAddParkAttractions();
    if (isLoading) return <Loader>We're loading your board</Loader>

    if (isAddingItem) return <Loader>We're creating your attraction</Loader>

    if (isErrorAddingItem) {
        return <Alert severity="error">Oops, we were unable to create your attraction.</Alert>
    }

    if (isError) {
        return <Alert severity="error">Board could not be loaded</Alert>
    }


    return (
        <Box sx={{ position: 'relative', width:'100%', height: '60vh', display:'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddAttractionDialog
                isOpen={isDialogOpen}
                onSubmit={(attraction) => {
                    addItem({
                        ...attraction,
                        parkID: id!
                    });
                }}
                onClose={() => setIsDialogOpen(false)}
            />
            <CustomedMap  />
            <img
                src={parkGate}
                alt="parkGate"
                style={{
                    position: 'absolute',
                    top: `${1 * (3.6 * (13 * 0.5))}rem`,
                    left: `${1 * (7 * 0.5)}rem`,
                    width: `${width}`,
                    height: `${height}`
                }}
            />
            {attractions?.map(({
                parkAttractionId,
                image,
                positionX,
                positionY
            }) => (
                <Link
                    key={parkAttractionId}
                    to={`/attractions/${parkAttractionId}`}
                >
                    <img
                        src={image}
                        alt=""
                        style={{
                            position: 'absolute',
                            top: `${positionY}`,
                            left: `${positionX}`,
                            width: `${width}`,
                            height: `${height}`
                        }}
                    />
                </Link>
            ))}

            <Fab
                title="add new attraction"
                size="large"
                color="secondary"
                aria-label="add"
                style={{ position: 'absolute', left: '1rem', bottom: '10rem' }}
                onClick={() => setIsDialogOpen(true)}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
}