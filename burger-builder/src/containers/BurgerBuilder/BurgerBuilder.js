import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 1.3,
    bacon: 1.20,
    cheese: 0.97,
    meat: 2.56
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('/ingredients.json').then(res=>{
            console.log(res.data);
            this.setState({ingredients: {...res.data}})
        }).catch(error=>{
            this.setState({error: true});
        })
    }

    purchasingBurgerHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKeys=>{
            return ingredients[ingKeys];
        })
        .reduce((sum, el)=>{
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
        
    }

    addingredientHandler = (type) => {
        console.log("type", type);
        const prevCount = this.state.ingredients[type];
        const newCount = prevCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = priceAddition + this.state.totalPrice;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type]>0){
            const prevCount = this.state.ingredients[type];
            const newCount = prevCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = newCount;
    
            const priceReduction = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice - priceReduction;
    
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchasableState(updatedIngredients);
        }  
    }

    //modal close code
    closeModal = () => {
        this.setState({purchasing: false});
    }

    purchaseCountinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Akshay',
                address: {
                    street: 'test',
                    zipCode: '12345',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'express'
        }
        //alert("you clicked continue");
        axios.post('/orders.json', order)
             .then(response=>{
                 console.log(response);
                 this.setState({purchasing: false, loading: false});
                })
             .catch(error=>{
                this.setState({purchasing: false, loading: false});
             });

    }

    render(){
        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        const countInfo = {...this.state.ingredients};

        let burgerSetup = this.state.error ? <p>Unable to load ingredients</p> : <Spinner />

        if(this.state.ingredients){
            burgerSetup = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        orderingBurder={this.purchasingBurgerHandler}
                        purchasable={this.state.purchasable} 
                        price={this.state.totalPrice} 
                        count={countInfo} 
                        disabled={disabledInfo} 
                        addIngredient={this.addingredientHandler} 
                        removeIngredient={this.removeIngredientHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                totalPrice={this.state.totalPrice}
                purchaseCancel={this.closeModal}
                purchaseCountinue={this.purchaseCountinueHandler}></OrderSummary>;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }
 
        return (
            <Aux>
                
                <Modal show={this.state.purchasing} modalClose={this.closeModal}>
                    {orderSummary}
                </Modal>
                {burgerSetup}   
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);