import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, FormHelperText, FormControl } from '@material-ui/core';

function Edit_PreviewItem(props) {
    const { artItem } = props;
    const { setArtItem } = props;
    const { setShowEditComponent } = props;
    const [showPreview, setShowPreview] = useState(false);
    const [editedArt, setEditedArt] = useState(artItem);
    // validation state objects
    const [titleError, setTitleError] = useState({});
    const [urlError, setUrlError] = useState({});
    const [descriptionError, setDescriptionError] = useState({});
    console.log(editedArt.name)

    const validate = () => {
        let isValid = true;
        const titleError = {};
        const urlError = {};
        const descriptionError = {};
        if (editedArt.name === '') {
            titleError.shortInput = 'Empty Field Not Allowed';
            titleError.notValid = true;
            isValid = false
        } if (editedArt.url === '') {
            urlError.shortInput = 'Empty Field Not Allowed';
            urlError.notValid = true;
            isValid = false
        } if (editedArt.description === '') {
            descriptionError.shortInput = 'Empty Field Not Allowed';
            descriptionError.notValid = true
            isValid = false
        }
        setTitleError(titleError)
        setUrlError(urlError);
        setDescriptionError(descriptionError);
        return isValid
    }

    const handleChange = (e) => {
        setEditedArt({ ...editedArt, [e.target.name]: e.target.value })
    }

    const saveItem = (e) => {
        e.preventDefault();
        let err = validate();
        if(err){
            // find if item exists in storage and update it with edited object
            let storageCollection = JSON.parse(localStorage.getItem('artItem'));
            if (!storageCollection) {
                let update = {
                    id: artItem.id,
                    name: editedArt.name,
                    type: artItem.type,
                    description: editedArt.description,
                    url: editedArt.url
                }
                let storage = localStorage.setItem('artItem', JSON.stringify(update));
                setArtItem(update)
                setShowEditComponent(false);
            }
            const departInfo = JSON.parse(localStorage.getItem('departInfo'));

            //update department list
            const filterDepart = departInfo.map(el => {
                return {
                    ...el, collection: el.collection.map(item =>
                        item.id === editedArt.id ?
                            {
                                id: item.id,
                                name: editedArt.name,
                                type: item.type,
                                collection: item.collection
                            } :
                            item)
                }
            })
            let storage = localStorage.setItem('artItem', JSON.stringify(editedArt));
            let departStorage = localStorage.setItem('departInfo', JSON.stringify(filterDepart));
            setArtItem([editedArt])
            setShowEditComponent(false);
        }
    }
    const onPreview = () => {
        setShowPreview(true);
    }
    return (
        <div className='layout-container'>
            <div className='edit-form-container'>
                <form onSubmit={saveItem} noValidate >
                    <div className='edit-input-field'>
                            <TextField
                                className='input-text'
                                label="Title"
                                name='name'
                                variant="outlined"
                                onChange={handleChange}
                                value={editedArt.name}
                                error={titleError.notValid}
                                helperText={titleError.shortInput}
                            />
                            <TextField
                                className='input-text'
                                label="Image URL"
                                name='url'
                                variant="outlined"
                                onChange={handleChange}
                                value={editedArt.url}
                                error={urlError.notValid}
                                helperText={urlError.shortInput}
                            />
                            <TextField
                                className='input-text'
                                multiline
                                label="Description"
                                name='description'
                                variant="outlined"
                                onChange={handleChange}
                                value={editedArt.description}
                                error={descriptionError.notValid}
                                helperText={descriptionError.shortInput}
                            />
                    </div>
                    <div className='save-preview-btns'>
                        <Button type='submit' className='save-btn' color='primary' variant='contained' >Save</Button>
                        <Button className='preview-btn' color='primary' variant='outlined' onClick={onPreview}>Preview</Button>
                    </div>
                </form>
            </div>
            <div className='preview-container'>
                {showPreview ?
                    <div>
                        <div className='item-container'>
                            <div className='img-container'>
                                <img src={editedArt.url}></img>
                            </div>
                            <div className='item-descripition'>
                                <div className='edit-btn-container'>
                                    <Typography variant='h5' color='textSecondary' >
                                        {editedArt.name}
                                    </Typography>
                                </div>
                                <Typography variant='h6' color='textSecondary'>
                                    {editedArt.description}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    : null

                }

            </div>
        </div>
    )
}
export default Edit_PreviewItem
