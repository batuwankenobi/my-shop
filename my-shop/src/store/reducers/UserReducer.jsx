export const UserActionTypes = {
    setUser: "SET_USER",
    setProductList: "SET_PRODUCT_LIST",
    setTotalProductCount: "SET_TOTAL_PRODUCT_COUNT",
    setPageCount: "SET_PAGE_COUNT",
    setActivePage: "SET_ACTIVE_PAGE",
    setFetchState: "SET_FETCH_STATE",
    logout: "LOGOUT"
}

const initialState = {
    user: {},
    productList: [],
    totalProductCount: 0,
    pageCount: 0,
    activePage: 0,
    fetchState: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.setUser:
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return { ...state, user: action.payload }
        case UserActionTypes.setProductList:
            return { ...state, productList: action.payload }
        case UserActionTypes.setTotalProductCount:
            return { ...state, totalProductCount: action.payload }
        case UserActionTypes.setPageCount:
            return { ...state, pageCount: action.payload }
        case UserActionTypes.setActivePage:
            return { ...state, activePage: action.payload }
        case UserActionTypes.setFetchState:
            return { ...state, fetchState: action.payload }
        case UserActionTypes.logout:
            window.localStorage.removeItem("token");
            return { ...state, user: {} }
        default:
            return state;
    }
}


export default reducer