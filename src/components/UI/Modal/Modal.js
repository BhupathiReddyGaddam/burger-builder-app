import React from 'react';
import classes from './Modal.css';

const Modal = (props) => {
    let orderSum = null;    
    if(props.show) {
        orderSum = classes.ModalTrue;
    } else {
        orderSum = classes.ModalFalse;
    }
    return(
        <div className = {[classes.Modal, orderSum].join(' ')}>
        {/* style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'}} */}
            {props.children}
        </div>
    );
}
export default Modal;