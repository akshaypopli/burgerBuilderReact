import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => {
    return <div className={classes.BuildControls}>
        <p className={classes.price}>Total Price: $ {props.price.toFixed(2)}</p>
        {   
            controls.map(ctrl => (
                 <BuildControl 
                 key={ctrl.label} 
                 type={ctrl.type} 
                 label={ctrl.label}
                 disabled={props.disabled[ctrl.type]}
                 count={props.count[ctrl.type]}
                 more={()=>props.addIngredient(ctrl.type)}
                 less={()=>props.removeIngredient(ctrl.type)} />
            ))
        }
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.orderingBurder}>Order Now</button>
    </div>
}

export default buildControls;