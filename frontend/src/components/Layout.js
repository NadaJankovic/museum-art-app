import React, { useContext, useEffect, useState } from 'react'
import { ServiceContext } from '../services/serviceContext';

function Layout(props) {
    // API calls for testing purposes
   /*   const service = useContext(ServiceContext)

    const fetchTreeData = async () => {
        const treeData = await service.mainService.getCollection();
      console.log(treeData)
    }
     const fetchItemById = async () => {
         //arbitrary params id value
         const itemId= '201';
         const collectionItemById=  await service.mainService.getItemById(itemId);
         console.log(collectionItemById);
     }
     useEffect(()=>{
         fetchItemById()
     },[])
      useEffect(()=>{
        fetchTreeData();
    },[]) */
    return (
        <div className='layout-container'>
            <div className='layout-child-fixed'>
            </div>
            <div className='layout-child'>
            </div>
        </div>
    )
}

export default Layout
