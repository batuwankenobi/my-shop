export const GlobalActionTypes = {
    setRoles: "SET_ROLES",
    setCategories: "SET_CATEGORIES",
    setTheme: "SET_THEME",
    setLanguage: "SET_LANGUAGE"
}

const initialState = {
    roles: [],
    categories: [],
    theme: "",
    language: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GlobalActionTypes.setRoles:
            return { ...state, roles: action.payload }
        case GlobalActionTypes.setCategories:
            return { ...state, categories: action.payload }
        case GlobalActionTypes.setTheme:
            return { ...state, theme: action.payload }
        case GlobalActionTypes.setLanguage:
            return { ...state, language: action.payload }
        default:
            return state;
    }

}


export default reducer