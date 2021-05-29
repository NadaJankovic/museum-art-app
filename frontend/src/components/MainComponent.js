import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../services/serviceContext';
import NavBar from './NavBar';
import TreeComponent from './TreeComponent';
import SearchBarComponent from './SearchBarComponent';
import ScreenDetailComponent from './ScreenDetailComponent';

function MainComponent() {
    const service = useContext(ServiceContext)
    const [museumArtData, setMuseumArtData] = useState([]);
    const [departmentInfo, setDepartmentInfo] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [radioValue, setRadioValue] = useState("all");
    const [artItem, setArtItem] = useState([]);

    const fetchItemById = async () => {
        //some arbitrary id
        const id = '103';
        const collectionItemById = await service.mainService.getItemById(id);
        setArtItem(collectionItemById);
    }
    useEffect(() => {
        fetchItemById()
    }, [])

    const handleChange = (event) => {
        setRadioValue(event.target.value);
    }
    const handleInputChange = (event) => {
        setSearchInput(event.target.value)
    }
    const clearInputField = () => {
        setSearchInput('')
    };
    const filterData = () => {
        const filterArt = departmentInfo.map(el => {
            return {
                ...el, collection: el.collection.filter(item => radioValue === 'all' ?
                    item.name.toLowerCase().includes(searchInput.toLocaleLowerCase()) :
                    item.type === radioValue && item.name.toLowerCase().includes(searchInput.toLocaleLowerCase()))
            }
        })
        return filterArt
    }

    const fetchTreeData = async () => {
        const treeData = await service.mainService.getCollection();
        setMuseumArtData([treeData])
        setDepartmentInfo(treeData.collection)
    }

    useEffect(() => {
        fetchTreeData();
    }, []);

    return (
        <>
            <NavBar />
            <div className='layout-container'>
                <div className='layout-child-fixed'>
                    <SearchBarComponent radioValue={radioValue} handleChange={handleChange} handleInputChange={handleInputChange} clearInputField={clearInputField} />
                    <TreeComponent museumArtData={museumArtData} departmentInfo={[...filterData()]} />
                </div>
                <div className='layout-child'>
                    <ScreenDetailComponent artItem={artItem} />
                </div>
            </div>
        </>
    )
}

export default MainComponent
