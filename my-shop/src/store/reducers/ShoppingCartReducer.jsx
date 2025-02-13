export const ShoppingCartActionTypes = {
    addToCart: "ADD_TO_CART",
    removeFromCart: "REMOVE_FROM_CART",
    deleteFromCart: "DELETE_FROM_CART",
    cleanCart: "CLEAN_CART",
    setPayment: "SET_PAYMENT",
    setAddress: "SET_ADDRESS",
    toggleCheck: "TOGGLE_CHECK"
}

const initialState = {
    cart: [],
    payment: {},
    address: {},
}

const reducer = (state = initialState, action) => {
    let isAlreadyExist = false;
    let newCart = [...state.cart];

    switch (action.type) {
        case ShoppingCartActionTypes.addToCart:
            for (const item of state.cart) {
                if (action.payload.id === item.product.id) {
                    isAlreadyExist = true;
                    break;
                }
            }
            let itemAdd = { product: action.payload };
            if (isAlreadyExist) {
                for (let i = 0; i < newCart.length; i++) {
                    if (newCart[i].product.id === action.payload.id) {

                        itemAdd = { count: newCart[i].count + 1, checked: newCart[i].checked, ...itemAdd }
                        newCart = [...newCart.slice(0, i), itemAdd, ...newCart.slice(i + 1)]
                        break;
                    }
                }
            } else {
                itemAdd = { count: 1, checked: true, ...itemAdd };
                newCart.unshift(itemAdd);
            }
            return { ...state, cart: [...newCart] }
        case ShoppingCartActionTypes.removeFromCart:
            for (let i = 0; i < newCart.length; i++) {
                if (action.payload.id === newCart[i].product.id) {
                    if (newCart[i].count > 1) {
                        newCart = [...newCart.slice(0, i), { ...newCart[i], count: newCart[i].count - 1 }, ...newCart.slice(i + 1)]
                    } else {
                        newCart.splice(i, 1);
                    }
                    break;
                }
            }
            return { ...state, cart: [...newCart] }
        case ShoppingCartActionTypes.deleteFromCart:
            for (let i = 0; i < newCart.length; i++) {
                if (action.payload.id === newCart[i].product.id) {
                    newCart.splice(i, 1);
                    break;
                }
            }
            return { ...state, cart: [...newCart] }
        case ShoppingCartActionTypes.cleanCart:
            return { ...state, cart: [] };
        case ShoppingCartActionTypes.toggleCheck:
            for (let i = 0; i < newCart.length; i++) {
                if (action.payload.id === newCart[i].product.id) {
                    newCart = [...newCart.slice(0, i), { ...newCart[i], checked: !newCart[i].checked }, ...newCart.slice(i + 1)]
                    break;
                }
            }
            return { ...state, cart: [...newCart] }
        case ShoppingCartActionTypes.setPayment:
            return { ...state, payment: action.payload }
        case ShoppingCartActionTypes.setAddress:
            return { ...state, address: action.payload }
        default:
            return state;
    }

}


export default reducer