import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return(
        <div className = {classes.Toolbar}>
            <DrawerToggle clicked={props.clicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className = {classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </div>
    );
}
export default Toolbar;