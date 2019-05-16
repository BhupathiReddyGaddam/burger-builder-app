import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary';

const SideDrawer = (props) => {
    let closeOpenSideDrawer = classes.Close;
    if(props.open) {
        closeOpenSideDrawer = classes.Open;
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.clicked}/>
            <div className = {[classes.SideDrawer, closeOpenSideDrawer].join(' ')}>
                <div className = {classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}
export default SideDrawer;