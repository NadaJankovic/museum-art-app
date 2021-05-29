import React,{ useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../services/serviceContext';
import TreeComponent from './TreeComponent';
import SearchBarComponent from './SearchBarComponent';

function MainComponent() {
    const service = useContext(ServiceContext)
    const [museumArtData, setMuseumArtData] = useState([]);
    const [departmentInfo, setDepartmentInfo] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [radioValue, setRadioValue] = useState("all");

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
        <div className='layout-container'>
            <div className='layout-child-fixed'>
                <SearchBarComponent radioValue={radioValue} handleChange={handleChange} handleInputChange={handleInputChange} clearInputField={clearInputField} />
                <TreeComponent museumArtData={museumArtData} departmentInfo={[...filterData()]}/>
            </div>
            <div className='layout-child'>
            </div>
        </div>
    )
}

export default MainComponent
