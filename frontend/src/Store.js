import { useReducer,createContext } from 'react'

const Store = createContext()

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
}

function reducer(state,action){
    switch (action.type){
        case 'ADD_CART_ITEM':
            const newItem = action.payload
            const existingItem = state.cart.cartItems.find((item)=> item._id === newItem._id)
            const cartItems = existingItem ? state.cart.cartItems.map((item)=> item._id === existingItem._id ? newItem : item) : 
            [...state.cart.cartItems,newItem]
            localStorage.setItem("cartItems", JSON.stringify(cartItems))

            return {...state,cart:{...state.cart,cartItems}}

            case 'REMOVE_CART_ITEM':{
                const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id)
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                return {...state,cart:{...state.cart,cartItems}}
            }
                
            default:
                return state
    }
}


const userinitialstate = {
    userInfo : localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null
}

function userreducer(state,action){
    switch(action.type){
        case "USER_SIGNIN":
            return {...state,userInfo: action.payload}
        case "USER_LOGOUT":
            return {...state,userInfo: null}
        default:
            return state
    }
}

function StoreProvider(props){
    const [state,dispatch] = useReducer(reducer,initialState)
    const [state1,dispatch1] = useReducer(userreducer,userinitialstate)

    const value = {state,dispatch,state1,dispatch1}
    return <Store.Provider value={value}>{props.children}</Store.Provider>

}

export  {Store,StoreProvider};