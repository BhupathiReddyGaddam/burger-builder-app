import React from 'react';

import classes from './Input.css';


const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.Input];
    let validationError = null;

    if(props.invalid && props.shouldValidate && props.tocuched) {
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value!</p>;
    }
    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement =<textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => {
                            return <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        })}

                </select>
            );
            break;
        default:
            inputElement =<input 
                className={classes.InputElement} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;  
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}
export default Input;