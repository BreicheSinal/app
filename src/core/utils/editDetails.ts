import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";

import {
  Experience,
  dispatchFetch,
  getStoredRole,
  getStoredRoleId,
} from "./globalUtils";

const role = getStoredRole();
const roleId = getStoredRoleId();

const getEndpoint = (role: string, roleId: number) =>
  `/${role.toLowerCase()}/editProfile/${roleId}`;

export const editExperience = async (
  experience: Experience,
  dispatch: AppDispatch,
  exp_id: number,
  id: number
) => {
  try {
    if (!role) throw new Error("User role or ID missing");
    const endpoint = `/${role.toLowerCase()}/editExpCert/${exp_id}`;

    await requestApi(endpoint, "PUT", experience);
    await dispatchFetch(role, id, dispatch);
  } catch (error) {
    console.error("Error editing experience:", error);
    throw error;
  }
};

export const editBio = async (updatedBio: string, dispatch: AppDispatch) => {
  try {
    if (!role || !roleId) throw new Error("User role or ID missing");

    const endpoint = `/${role.toLowerCase()}/editBio/${roleId}`;
    await requestApi(endpoint, "PUT", { bio: updatedBio });
    await dispatchFetch(role, roleId, dispatch);
  } catch (error) {
    console.error("Error updating bio:", error);
    throw error;
  }
};

/* EDIT PROFILE DATA */
const formatFields = (fields: { [key: string]: string | number | null }) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    if (key === "Club") acc["club_id"] = parseInt(value as string);
    else if (["Height", "Weight"].includes(key))
      acc[key.toLowerCase()] = parseFloat(value as string);
    else if (["Age", "Founded Year"].includes(key)) {
      acc[key === "Founded Year" ? "founded_year" : "age"] = parseInt(
        value as string
      );
    } else acc[key.toLowerCase()] = value;
    return acc;
  }, {} as { [key: string]: string | number | null });
};

export const editProfile = async (
  updatedFields: { [key: string]: string | number | null },
  role: string,
  dispatch: AppDispatch
) => {
  if (!role || !roleId) throw new Error("User role or ID missing");

  const formattedFields = formatFields(updatedFields);
  const endpoint = getEndpoint(role, roleId);

  await requestApi(endpoint, "PUT", formattedFields);
  await dispatchFetch(role, roleId, dispatch);
};
