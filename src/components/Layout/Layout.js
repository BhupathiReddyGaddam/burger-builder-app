import React from 'react';
import Aux from '../../hoc/Auxilliary';
import Classes from './Layout.css'

const Layout = (props) => (
    <Aux>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>
);
export default Layout;