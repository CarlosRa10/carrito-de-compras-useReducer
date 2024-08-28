import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

//Accion- las aciiones
export type CartActions = 
    {type: 'add-to-cart', payload:{item:Guitar}}|
    {type: 'remove-from-cart', payload:{id:Guitar['id']}}|
    {type: 'decrease-quantity', payload:{id:Guitar['id']}}|
    {type: 'increase-quantity', payload:{id:Guitar['id']}}|
    {type: 'clear-cart'}

//State- Los estados 
export type CartState = {
//data es nuesta base de datos de guitarra 
    data:Guitar[]
    cart:CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

//State Inicial-- le decimos que va a usar el type de CartState (initialState : CartState)
export const initialState : CartState = {
    data: db,
    cart:initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

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

        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        console.log(itemExists)
        let updatedCart : CartItem[] = []
        if(itemExists) { // existe en el carrito
            updatedCart = state.cart.map(item=>{
                if(item.id===action.payload.item.id){
                    if(item.quantity<MAX_ITEMS){
                        return {...item, quantity:item.quantity + 1}//copia el element actual y escribimos en cantidad
                    }else{
                        return item
                    }
                }else{
                    return item
                }
            })
        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1}
            updatedCart = [...state.cart, newItem]//Se agrega el nuevo elemento al carrito actualizado usando el spread operator
        }

        return{
            ...state,
            cart: updatedCart

        }
    }
    if(action.type==='remove-from-cart'){
        const cart = state.cart.filter(item=>item.id !== action.payload.id)
        return{
            ...state,
            cart 

        }
    }
    if(action.type==='decrease-quantity'){
        const guitar = state.cart.find((guitar) => guitar.id === action.payload.id)
        if (guitar?.quantity === 1) {
          return{
            ...state,
            cart:state.cart.filter(guitar=>guitar.id !== action.payload.id)
          }
        }
        const cart = state.cart.map( item => {
          if(item.id === action.payload.id && item.quantity > MIN_ITEMS) {
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        return{
            ...state,
            cart

        }
    }
    if(action.type==='increase-quantity'){
        const cart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return{
            ...state,
            cart

        }
    }
    if(action.type==='clear-cart'){
        return{
            ...state,
            cart:[]

        }
    }
    return state
}