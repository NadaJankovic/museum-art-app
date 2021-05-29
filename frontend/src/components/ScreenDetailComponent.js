import React from 'react';
import { Button, Typography } from '@material-ui/core';

function ScreenDetailComponent(props) {
    return (
        <>
            {props.artItem.map(el =>
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
        </>
    );
}

export default ScreenDetailComponent