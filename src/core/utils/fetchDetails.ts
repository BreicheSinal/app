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
  ValidRoleType,
  Tryout,
  Certificate,
  AthleteTryOut,
} from "./globalUtils";

import { setTryOuts } from "../../redux/users/tryOutSlice";

const parseUserData = (
  roleType: ValidRoleType,
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
        experiences: response.experience?.map((exp: Experience) => ({
          id: exp.id,
          name: exp.name,
          date: exp.date,
          description: exp.description,
        })),
        tryOuts: response.tryOuts?.map((tr: AthleteTryOut) => ({
          id: tr.id,
          status: tr.status,
          trId: tr.trId,
          name: tr.name,
          date: tr.date,
          description: tr.description,
          meetingUrl: tr.meetingUrl,
          club_id: tr.club_id,
          club_name: tr.club_name,
          club_user_id: tr.club_user_id,
        })),
      };

    case "Coach":
      return {
        ...baseDetails,
        club_id: data.club?.id || null,
        club: data.club?.user?.name || null,
        specialty: data.specialty || null,
        experiences: response.experience?.map((exp: Experience) => ({
          id: exp.id,
          name: exp.name,
          date: exp.date,
          description: exp.description,
        })),
        certificates: response.certificate?.map((cert: Certificate) => ({
          id: cert.id,
          name: cert.name,
          date: cert.date,
          description: cert.description,
        })),
      };

    case "Club":
      return {
        ...baseDetails,
        federation_id: data.federation?.id || null,
        federation: data.federation?.user?.name || null,
        location: data.location || null,
        founded_year: data.founded_year || null,
        tryouts:
          response.tryOuts?.map((tr: Tryout) => ({
            id: tr.id,
            name: tr.name,
            date: tr.date,
            description: tr.description,
            meetingUrl: tr.meetingUrl,
          })) || null,
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
  (role: ValidRoleType, id: number) => async (dispatch: AppDispatch) => {
    const { setLoading, setError, setDetails } = createSetters(role);

    try {
      dispatch(setLoading(true));
      const url = `/${role.toLowerCase()}/${id}`;
      const response = await requestApi(url);
      const userData = response[role.toLowerCase()][0];
      const details = parseUserData(role, userData, response);

      dispatch(setDetails(details as any));
    } catch (error: any) {
      console.error(`Error fetching ${role} details:`, error);
      dispatch(setError(error.message || `Failed to fetch ${role} details`));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchSearchedUserDetails = async (
  role: ValidRoleType,
  userId: number
) => {
  try {
    const url = `/${role.toLowerCase()}/user/${userId}`;
    const response = await requestApi(url);
    const userData = response[role.toLowerCase()][0];

    return parseUserData(role, userData, response);
  } catch (error: any) {
    console.error(`Error fetching ${role} details:`, error);
    throw new Error(error.message || `Failed to fetch ${role} details`);
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

export const fetchFederationOptions = async () => {
  try {
    const response = await requestApi("/federation/getFederations", "GET");
    return response.federations.map((fede: Club) => ({
      id: Number(fede.id),
      name: fede.user.name,
    }));
  } catch (error) {
    console.error("Error fetching federations:", error);
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
      return response.users.map((user: UserDetails) => {
        return {
          id: user.id,
          name: user.name,
          avatar: user.avatar || "",
          role: user.role,
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

export const fetchConnectionStatus = async (
  userId: number,
  connectedUserId: number
) => {
  try {
    const response = await requestApi(
      `/user/${connectedUserId}?userId=${userId}`,
      "GET"
    );

    if (
      !response.connection ||
      response.message === "No connection found between the users"
    ) {
      return null;
    }

    return response.connection.status;
  } catch (error) {
    console.error("Error fetching connection status:", error);
    return null;
  }
};

export const fetchTryOuts = async (dispatch: AppDispatch) => {
  try {
    const url = `/user/tryOuts`;
    const response = await requestApi(url);

    if (response.message === "Fetched TryOuts Successfully") {
      const formattedTryOuts = response.tryOuts.map(
        (tryout: AthleteTryOut) => ({
          ...tryout,
          id: Number(tryout.id),
          club_id: Number(tryout.club_id),
          club_user_id: Number(tryout.club_user_id),
        })
      );

      dispatch(setTryOuts(formattedTryOuts));
    }
  } catch (error: any) {
    console.error("Error fetching connection status:", error);
    return null;
  }
};

const getBaseProfileData = (details: UserDetails) => ({
  title: details.name,
  avatar: details.name.charAt(0),
});

const getProfileFields = (
  role: ValidRoleType,
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
      { label: "Height", value: `${(details as AthleteDetails).height}` },
      { label: "Weight", value: `${(details as AthleteDetails).weight}` },
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
      {
        label: "Federation",
        value: (details as ClubDetails).federation_id || "",
        displayValue: (details as ClubDetails).federation || "N/A",
        type: "select",
        options: clubs,
      },
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
  role: ValidRoleType | null,
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

export const getCertificateData = (certificates: Certificate[] = []) => ({
  certificates,
});
