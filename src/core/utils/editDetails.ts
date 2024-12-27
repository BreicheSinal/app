import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";
import {
  fetchAthleteDetails,
  fetchCoachDetails,
  fetchClubDetails,
  fetchFederationDetails,
} from "./fetchDetails";

import { Experience } from "../../redux/users/athleteSlice";

const role = localStorage.getItem("role");
const specificRoleId = localStorage.getItem("specificRoleId");

const getEndpoint = (role: string, id: number) =>
  `/${role.toLowerCase()}/editProfile/${id}`;

const dispatchFetch = (role: string, id: number, dispatch: AppDispatch) => {
  const actions = {
    Athlete: fetchAthleteDetails,
    Coach: fetchCoachDetails,
    Club: fetchClubDetails,
    Federation: fetchFederationDetails,
  };

  const action = actions[role as keyof typeof actions];
  if (!action) throw new Error("Invalid role");
  return dispatch(action(id));
};

export const editExperience = async (
  experience: Experience,
  dispatch: AppDispatch,
  exp_id: number,
  id: number
) => {
  try {
    if (!role) throw new Error("User role or ID missing");

    console.log(exp_id);
    const endpoint =
      role === "Athlete"
        ? `/athlete/editExpCert/${exp_id}`
        : `/coach/editExpCert/${exp_id}`;

    console.log(experience);
    await requestApi(endpoint, "PUT", experience);

    switch (role) {
      case "Athlete":
        dispatch(fetchAthleteDetails(id));
        break;
      case "Coach":
        dispatch(fetchCoachDetails(id));
        break;
      case "Club":
        dispatch(fetchClubDetails(id));
        break;
      case "Federation":
        dispatch(fetchFederationDetails(id));
        break;
      default:
        throw new Error("Invalid role");
    }
  } catch (error) {
    console.error("Error editing experience:", error);
    throw error;
  }
};

export const editBio = async (updatedBio: string, dispatch: AppDispatch) => {
  try {
    if (!role || !specificRoleId) throw new Error("User role or ID missing");

    const id = parseInt(specificRoleId);

    // updating bio based on role
    const endpoint =
      role === "Athlete"
        ? `/athlete/editBio/${id}`
        : role === "Coach"
        ? `/coach/editBio/${id}`
        : role === "Club"
        ? `/club/editBio/${id}`
        : `/federation/editBio/${id}`;

    await requestApi(endpoint, "PUT", { bio: updatedBio });

    // refetching updated details for the user
    switch (role) {
      case "Athlete":
        dispatch(fetchAthleteDetails(id));
        break;
      case "Coach":
        dispatch(fetchCoachDetails(id));
        break;
      case "Club":
        dispatch(fetchClubDetails(id));
        break;
      case "Federation":
        dispatch(fetchFederationDetails(id));
        break;
      default:
        throw new Error("Invalid role");
    }
  } catch (error) {
    console.error("Error updating bio:", error);
  }
};

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
  if (!role || !specificRoleId) throw new Error("User role or ID missing");

  const id = parseInt(specificRoleId);
  const formattedFields = formatFields(updatedFields);
  const endpoint = getEndpoint(role, id);

  await requestApi(endpoint, "PUT", formattedFields);
  await dispatchFetch(role, id, dispatch);
};
