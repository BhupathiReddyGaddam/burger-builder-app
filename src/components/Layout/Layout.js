import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return{showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return(
            <Aux>
                <SideDrawer open = {this.state.showSideDrawer}
                clicked = {this.closeSideDrawerHandler}/>
                <Toolbar clicked={this.openSideDrawerHandler}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 
export default Layout;