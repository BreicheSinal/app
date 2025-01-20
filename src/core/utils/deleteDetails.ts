import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";

import { getStoredRole, getStoredRoleId, dispatchFetch } from "./globalUtils";

const role = getStoredRole();
const roleId = getStoredRoleId();

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
