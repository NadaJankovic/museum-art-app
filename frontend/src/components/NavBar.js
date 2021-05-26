import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';


export default function NavBar() {

  return (
    <div >
      <AppBar position="static" className='navBar-container'>
        <Toolbar>
          <IconButton edge="start" className='navBar-menu-button' color="inherit" aria-label="menu">
            <MoreHorizIcon fontSize='large' />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}