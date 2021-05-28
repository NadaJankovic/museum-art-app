import React, { useContext, useEffect, useState } from 'react'
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { ServiceContext } from '../services/serviceContext';
import SearchBarComponent from './SearchBarComponent';

function TreeComponent () {
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
  const clearInputField= () =>{
      setSearchInput('')
  };
  const filterData= () => {
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
                <SearchBarComponent radioValue={radioValue} handleChange={handleChange} handleInputChange={handleInputChange} clearInputField={clearInputField}/>
                <TreeView
                    className='tree-view'
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                > {museumArtData.map(el =>
                    <TreeItem key= {el.id } nodeId={el.id} label={el.name}>
                      {filterData().map(depart =>
                            <TreeItem key= {depart.id } nodeId={depart.id} label={depart.name}>
                                {depart.collection.map(item =>
                                    <TreeItem key= {item.id} nodeId={item.id} label={item.name} />
                                )}
                            </TreeItem>
                        )}
                    </TreeItem>
                )}
                </TreeView>
            </div>
            <div className='layout-child'>
            </div>
        </div>
    )
}

export default TreeComponent