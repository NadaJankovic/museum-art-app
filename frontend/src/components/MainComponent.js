import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../services/serviceContext';
import NavBar from './NavBar';
import TreeComponent from './TreeComponent';
import SearchBarComponent from './SearchBarComponent';
import ScreenDetailComponent from './ScreenDetailComponent';
import Edit_PreviewItem from './Edit_PreviewItem';

function MainComponent() {
    const service = useContext(ServiceContext)
    const [museumArtData, setMuseumArtData] = useState([]);
    const [departmentInfo, setDepartmentInfo] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [radioValue, setRadioValue] = useState("all");
    const [itemId, setItemId] = useState('');
    const [showEditComponent, setShowEditComponent] = useState(false);
    const [artItem, setArtItem] = useState({});


    const handleChange = (event) => {
        setRadioValue(event.target.value);
    }
    const handleInputChange = (event) => {
        setSearchInput(event.target.value)
    }

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
        const storageTree = JSON.parse(localStorage.getItem('treeData'));
            const treeData = await service.mainService.getCollection();
            setMuseumArtData([treeData]);
            setDepartmentInfo(treeData.collection)
    }

    useEffect(() => {
        fetchTreeData();
    }, []);


    // conditional rendering
    if (showEditComponent) {
        return <Edit_PreviewItem itemId={itemId} artItem={artItem} setArtItem={setArtItem}  setShowEditComponent={setShowEditComponent} setDepartmentInfo={setDepartmentInfo} departmentInfo={[...filterData()]} />
    } else {

        return (
            <>
                <NavBar />
                <div className='layout-container'>
                    <div className='layout-child-fixed'>
                        <SearchBarComponent radioValue={radioValue} handleChange={handleChange} handleInputChange={handleInputChange} />
                        <TreeComponent museumArtData={museumArtData} departmentInfo={[...filterData()]} setItemId={setItemId} />
                    </div>
                    <div className='layout-child'>
                        <ScreenDetailComponent itemId={itemId} artItem={artItem} setArtItem={setArtItem} setShowEditComponent={setShowEditComponent} />
                    </div>
                </div>
            </>
        )
    }
}

export default MainComponent
