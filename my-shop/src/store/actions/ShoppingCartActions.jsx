import { ShoppingCartActionTypes } from "../reducers/ShoppingCartReducer";

export const addToCartAction = (data) => {
    return { type: ShoppingCartActionTypes.addToCart, payload: data }
}
export const removeFromCartAction = (data) => {
    return { type: ShoppingCartActionTypes.removeFromCart, payload: data }
}
export const deleteFromCartAction = (data) => {
    return { type: ShoppingCartActionTypes.deleteFromCart, payload: data }
}
export const cleanCartAction = () => {
    return { type: ShoppingCartActionTypes.cleanCart }
}
export const setPaymentAction = (data) => {
    return { type: ShoppingCartActionTypes.setPayment, payload: data }
}
export const setAddressAction = (data) => {
    return { type: ShoppingCartActionTypes.setAddress, payload: data }
}
export const toggleCheckAction = (data) => {
    return { type: ShoppingCartActionTypes.toggleCheck, payload: data }
}