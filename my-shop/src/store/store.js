import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import globalReducer from "./reducers/GlobalReducer.jsx";
import userReducer from "./reducers/UserReducer.jsx";
import shoppingCartReducer from "./reducers/ShoppingCartReducer.jsx";
import storeReducer from "./reducers/StoreReducer.jsx";
import productReducer from "./reducers/ProductReducer.jsx";

import { thunk } from 'redux-thunk';

export const reducers = combineReducers({
    global: globalReducer,
    user: userReducer,
    shoppingCart: shoppingCartReducer,
    store: storeReducer,
    productStore: productReducer
})

export const store = createStore(reducers, applyMiddleware(thunk));