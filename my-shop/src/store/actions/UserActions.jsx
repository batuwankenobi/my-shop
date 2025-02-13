import { SHA256 } from "crypto-js";
import { ecommerceAPI } from "../../instance";
import { UserActionTypes } from "../reducers/UserReducer";

export const setUserAction = (data) => {
    return { type: UserActionTypes.setUser, payload: data }
}
export const setProductListAction = (data) => {
    return { type: UserActionTypes.setProductList, payload: data }
}
export const setTotalProductCountAction = (data) => {
    return { type: UserActionTypes.setTotalProductCount, payload: data }
}
export const setPageCountAction = (data) => {
    return { type: UserActionTypes.setPageCount, payload: data }
}
export const setActivePageAction = (data) => {
    return { type: UserActionTypes.setActivePage, payload: data }
}
export const setFetchStateAction = (data) => {
    return { type: UserActionTypes.setFetchState, payload: data }
}
export const logoutAction = () => {
    return { type: UserActionTypes.logout }
}

export const loginAction = (creds, history, setSubmitError) => async (dispatch) => {
    await ecommerceAPI
        .post("/login", creds)
        .then((res) => dispatch(setUserAction({ ...res.data, img: "https://gravatar.com/avatar/" + SHA256(res.data.email) + "?d=mp" })))
        .then(() => history.push("/"))
        .catch((err) => {
            console.error(err);
            setSubmitError(true);
        })
};

export const autoLoginAction = (setAutoLoginLoading) => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        await ecommerceAPI
            .get("/verify", {
                headers: {
                    Authorization: JSON.parse(token)
                }
            })
            .then((res) => dispatch(setUserAction({ ...res.data, img: "https://gravatar.com/avatar/" + SHA256(res.data.email) + "?d=mp" })))
            .catch(() => localStorage.removeItem("token"))
            .catch((err) => console.error(err))
    }
    await setAutoLoginLoading(false);

};