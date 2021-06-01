import React from 'react'
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

function TreeComponent (props) {

    return (
        <TreeView
            className='tree-view'
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
        > {props.museumArtData.map(el =>
            <TreeItem key= {el.id} nodeId={el.id} label= {el.name}>
                {props.departmentInfo.map(depart =>
                    <TreeItem key={depart.id} nodeId={depart.id} label={depart.name}>
                        {depart.collection.map(item =>
                            <a href='#' className='art-item'> <TreeItem key={item.id} nodeId={item.id} label={item.name} onClick={() => props.setItemId(item.id)} /></a>
                        )}
                    </TreeItem>
                )}
            </TreeItem>
        )}
        </TreeView>
    )
}

export default TreeComponent