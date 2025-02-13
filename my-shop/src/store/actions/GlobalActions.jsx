import { ecommerceAPI } from "../../instance";
import { GlobalActionTypes } from "../reducers/GlobalReducer";

export const setRolesAction = (data) => {
    return { type: GlobalActionTypes.setRoles, payload: data }
}
export const setCategoriesAction = (data) => {
    return { type: GlobalActionTypes.setCategories, payload: data }
}
export const setThemeAction = (data) => {
    return { type: GlobalActionTypes.setTheme, payload: data }
}
export const setLanguageAction = (data) => {
    return { type: GlobalActionTypes.setLanguage, payload: data }
}

export const fetchRoles = () => async (dispatch) => {
    await ecommerceAPI
        .get("/roles")
        .then((res) => dispatch(setRolesAction(res.data)))
        .catch((err) => console.error(err))
};

export const fetchCategories = () => async (dispatch) => {
    await ecommerceAPI
        .get("/categories")
        .then((res) => dispatch(setCategoriesAction(res.data)))
        .catch((err) => console.error(err))
};