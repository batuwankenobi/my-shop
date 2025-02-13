export const StoreActionTypes = {
    setStore: "SET_STORE",
}

const initialState = {
    store: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case StoreActionTypes.setStore:
            return { ...state, store: action.payload }
        default:
            return state;
    }
}


export default reducer