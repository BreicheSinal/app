import store, { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";

import { dispatchFetch } from "./globalUtils";

const state = store.getState();
const { role, roleId } = state.auth;

export const deleteExp = async (dispatch: AppDispatch, exp_id: number) => {
  try {
    if (!role || !roleId) throw new Error("User role or ID missing");

    const endpoint = `/user/deleteExpCert/${exp_id}`;
    await requestApi(endpoint, "DELETE");
    dispatchFetch(role, roleId, dispatch);
  } catch (error) {
    console.error("Error deleting bio:", error);
    throw error;
  }
};
