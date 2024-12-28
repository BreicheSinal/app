/* eslint-disable @typescript-eslint/no-explicit-any */
import { requestApi } from "./request";
import { AppDispatch } from "../../redux/store";
import {
  BaseUserDetails,
  UserDetails,
  Experience,
  Club,
  ClubOption,
  createSetters,
  AthleteDetails,
  CoachDetails,
  ClubDetails,
  FederationDetails,
} from "./globalUtils";

const parseUserData = (
  roleType: string,
  data: any,
  response: any
): UserDetails => {
  const baseDetails: BaseUserDetails = {
    id: parseInt(data.id),
    user_id: parseInt(data.user.id),
    name: data.user.name,
    bio: data.user.bio,
    role: roleType,
  };

  switch (roleType) {
    case "Athlete":
      return {
        ...baseDetails,
        club_id: data.club?.id || null,
        club: data.club?.user?.name || null,
        position: data.position || null,
        age: data.age || null,
        height: data.height ? parseFloat(data.height) : null,
        weight: data.weight ? parseFloat(data.weight) : null,
        experiences:
          response.experience?.map((exp: Experience) => ({
            id: exp.id,
            name: exp.name,
            date: exp.date,
            description: exp.description,
          })) || null,
      };

    case "Coach":
      return {
        ...baseDetails,
        club_id: data.club?.id || null,
        club: data.club?.user?.name || null,
        specialty: data.specialty || null,
        experiences:
          response.experience?.map((exp: Experience) => ({
            id: exp.id,
            name: exp.name,
            date: exp.date,
            description: exp.description,
          })) || null,
      };

    case "Club":
      return {
        ...baseDetails,
        federation_id: data.federation || null,
        federation: data.club?.user?.name || null,
        location: data.location || null,
        founded_year: data.founded_year || null,
      };

    case "Federation":
      return {
        ...baseDetails,
        location: data.location || null,
        country: data.country || null,
        founded_year: data.founded_year || null,
      };

    default:
      throw new Error("Invalid role type");
  }
};

export const fetchUserDetails =
  (role: string, id: number) => async (dispatch: AppDispatch) => {
    const { setLoading, setError, setDetails } = createSetters(role);

    try {
      dispatch(setLoading(true));
      const response = await requestApi(`/${role.toLowerCase()}/${id}`);
      const userData = response[role.toLowerCase()][0];
      dispatch(setDetails(parseUserData(role, userData, response)));
    } catch (error: any) {
      console.error(`Error fetching ${role} details:`, error);
      dispatch(setError(error.message || `Failed to fetch ${role} details`));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchClubOptions = async () => {
  try {
    const response = await requestApi("/club", "GET");
    return response.clubs.map((club: Club) => ({
      id: Number(club.id),
      name: club.user.name,
    }));
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw error;
  }
};

export const fetchSearchResults = async (
  currentUserId: number,
  searchValue: string
) => {
  if (!searchValue.trim() || !currentUserId) {
    return [];
  }

  try {
    const url = `/user/${currentUserId}/search?search=${encodeURIComponent(
      searchValue
    )}`;
    
    const response = await requestApi(url);

    if (response.status === "success") {
      return response.users.map((user: UserDetails) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar || "",
      }));
    }
    return [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

const getBaseProfileData = (details: UserDetails) => ({
  title: details.name,
  avatar: details.name.charAt(0),
});

const getProfileFields = (
  role: string,
  details: UserDetails,
  clubs?: ClubOption[]
) => {
  const fieldMappings = {
    Athlete: [
      {
        label: "Club",
        value: (details as AthleteDetails).club_id || "",
        displayValue: (details as AthleteDetails).club || "N/A",
        type: "select",
        options: clubs,
      },
      {
        label: "Position",
        value: (details as AthleteDetails).position || "N/A",
      },
      { label: "Age", value: (details as AthleteDetails).age },
      { label: "Height", value: `${(details as AthleteDetails).height} cm` },
      { label: "Weight", value: `${(details as AthleteDetails).weight} kg` },
    ],
    Coach: [
      {
        label: "Club",
        value: (details as CoachDetails).club_id || "",
        displayValue: (details as CoachDetails).club || "N/A",
        type: "select",
        options: clubs,
      },
      {
        label: "Specialty",
        value: (details as CoachDetails).specialty || "N/A",
      },
    ],
    Club: [
      { label: "Location", value: (details as ClubDetails).location || "N/A" },
      {
        label: "Founded Year",
        value: (details as ClubDetails).founded_year || "N/A",
      },
    ],
    Federation: [
      {
        label: "Country",
        value: (details as FederationDetails).country || "N/A",
      },
      {
        label: "Location",
        value: (details as FederationDetails).location || "N/A",
      },
      {
        label: "Founded Year",
        value: (details as FederationDetails).founded_year || "N/A",
      },
    ],
  };

  return fieldMappings[role as keyof typeof fieldMappings] || [];
};

export const getProfileData = (
  role: string | null,
  details: UserDetails,
  clubs?: ClubOption[]
) => {
  if (!role || !details) return { title: "Loading...", fields: [] };

  return {
    ...getBaseProfileData(details),
    fields: getProfileFields(role, details, clubs),
  };
};

export const getBioData = (bio: string | null) => ({
  title: "BIO",
  bioText: bio || "N/A",
});

export const getExperienceData = (experiences: Experience[] = []) => ({
  experiences,
});
