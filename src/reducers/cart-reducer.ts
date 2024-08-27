import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

//Accion- las aciiones
export type CartActions = 
    {type: 'add-to-cart', payload:{item:Guitar}}|
    {type: 'remove-from-cart', payload:{id:Guitar['id']}}|
    {type: 'decrease-quantity', payload:{id:Guitar['id']}}|
    {type: 'increase-quantity', payload:{id:Guitar['id']}}|
    {type: 'clear-cart', payload:{id:Guitar['id']}}

//State- Los estados 
export type CartState = {
//data es nuesta base de datos de guitarra 
    data:Guitar[]
    cart:CartItem[]
}

//State Inicial-- le decimos que va a usar el type de CartState (initialState : CartState)
export const initialState : CartState = {
    data: db,
    cart:[]
}

//Recucer--la funcion del reducer
export const cartReducer = (
        //toma el state y toma las acciones
        //toma el estado actual de una aplicación y una acción, y devuelve un nuevo estado 
        //state, contendrá toda la información sobre los productos que hay en el carrito, los precios, las cantidades, etc.
        //= Este signo igual asigna un valor inicial a la variable state.
        state:CartState = initialState, 
        action:CartActions
        //esto nos ayuda para el autocompletado en el reducer
    ) =>{
    if(action.type === 'add-to-cart'){

        return{
            ...state

        }
    }
    if(action.type==='remove-from-cart'){
        return{
            ...state

        }
    }
    if(action.type==='decrease-quantity'){
        return{
            ...state

        }
    }
    if(action.type==='increase-quantity'){
        return{
            ...state

        }
    }
    if(action.type==='clear-cart'){
        return{
            ...state

        }
    }
    return state
}