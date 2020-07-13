import React, {Component} from 'react';
import Button from '../../UI/Button/Button'

import Aux from '../../../hoc/Aux/Aux';

class OrderSummary extends Component {

    render(){
        const ingredientList = Object.keys(this.props.ingredients).map(igkey=>{
            return (
                <li key={igkey} style={{listStyleType:"none"}}>
                    <span style={{textTransform:"capitalize"}}>{igkey}</span>: {this.props.ingredients[igkey]}
                </li>
            );
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Your Burger will contain following ingredients: </p>
                <ul>
                    {ingredientList}
                </ul>
                <p><strong>Total Price: $ {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>

                <Button btnType="Danger" clicked={this.props.purchaseCancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseCountinue}>Continue</Button>
            </Aux>
        )
    }

}

export default OrderSummary;