import React, { useContext, useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { ServiceContext } from '../services/serviceContext';

function ScreenDetailComponent(props) {
    const { itemId } = props;
    const { setArtItem } = props;
    const { artItem } = props;
    const service = useContext(ServiceContext);
    const [art, setArt] = useState([]);

    const fetchItemById = async () => {
        const storageCollection = JSON.parse(localStorage.getItem('artItem'));
        if (!storageCollection || storageCollection.id !== itemId) {
            const collectionItemById = await service.mainService.getItemById(itemId);
            setArt(collectionItemById)

        } else {
            const storage = await service.mainService.getItemById(itemId);
            const storageCollection = JSON.parse(localStorage.getItem('artItem'));
            setArt([storageCollection])
        }
    }

    useEffect(() => {
        fetchItemById();
    }, [itemId])

    const edit = () => {
        setArtItem(art[0])
        props.setShowEditComponent(true);
    }

    if (art === undefined) { return <Typography variant='h5' color='textSecondary'> Choose art peace from the list.</Typography> }
    return (
        <div>
            {art.map(el =>
                <div className='item-container'>
                    <div className='img-container'>
                        <img src={el.url}></img>
                    </div>
                    <div className='item-descripition'>
                        <div className='edit-btn-container'>
                            <Typography key={el.id} variant='h5' color='textSecondary' >
                                {el.name}
                            </Typography>
                            <Button className='edit-btn' color='primary' variant='contained' onClick={edit}>Edit</Button>
                        </div>
                        <Typography key={el.id} variant='h6' color='textSecondary'>
                            {el.description}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    )
}


export default ScreenDetailComponent