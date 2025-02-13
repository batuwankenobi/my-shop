import { StoreActionTypes } from "../reducers/StoreReducer";

export const setStoreAction = (data) => {
    return { type: StoreActionTypes.setStore, payload: data }
}