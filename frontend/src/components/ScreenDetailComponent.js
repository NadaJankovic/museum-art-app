import React, { useContext, useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { ServiceContext } from '../services/serviceContext';

function ScreenDetailComponent(props) {
    const { itemId } = props;
    /*   const {artItem}=props;
      const {setArtItem} =props; */
    const service = useContext(ServiceContext);
    const [artItem, setArtItem] = useState([]);
    console.log(itemId)
    const fetchItemById = async () => {
        const collectionItemById = await service.mainService.getItemById(itemId);
        setArtItem(collectionItemById);
    }
    useEffect(() => {
        fetchItemById()
    }, [itemId]);
console.log(artItem)
    // conditional rendering in case no item is selected
    if (artItem=== undefined) {
        return <Typography variant='h5' color='textSecondary'> Choose art peace from the list.</Typography>
    }
    return (
        <div>
            {artItem.map(el =>
                <div className='item-container'>
                    <div className='img-container'>
                        <img src={el.url}></img>
                    </div>
                    <div className='item-descripition'>
                        <div className='edit-btn-container'>
                            <Typography variant='h5' color='textSecondary' >
                                {el.name}
                            </Typography>
                            <Button className='edit-btn' color='primary' variant='contained'>Edit</Button>
                        </div>
                        <Typography variant='h6' color='textSecondary'>
                            {el.description}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScreenDetailComponent