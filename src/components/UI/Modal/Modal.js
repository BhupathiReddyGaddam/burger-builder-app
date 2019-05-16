import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary/Auxilliary';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }
    render(props) {
        let orderSum = null;    
        if(this.props.show) {
            orderSum = classes.ModalTrue;
        } else {
            orderSum = classes.ModalFalse;
        }
        return(
            <Aux>
                <Backdrop show = {this.props.show} 
                clicked = {this.props.backdropClicked}/>
                <div className = {[classes.Modal, orderSum].join(' ')}>
                {/* style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'}} */}
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
export default Modal;