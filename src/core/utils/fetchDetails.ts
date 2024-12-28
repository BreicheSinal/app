/* eslint-disable @typescript-eslint/no-explicit-any */
import { requestApi } from "./request";

import {
  setAthleteDetails,
  setAthleteLoading,
  setAthleteError,
} from "../../redux/users/athleteSlice";
import {
  setCoachDetails,
  setCoachLoading,
  setCoachError,
} from "../../redux/users/coachSlice";
import {
  setClubDetails,
  setClubLoading,
  setClubError,
} from "../../redux/users/clubSlice";
import {
  setFederationDetails,
  setFederationLoading,
  setFederationError,
} from "../../redux/users/federationSlice";

import { AppDispatch } from "../../redux/store";

import { Experience, Club } from "./globalUtils";

export const fetchAthleteDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setAthleteLoading(true));

      const response = await requestApi(`/athlete/${id}`);
      const athleteData = response.athlete[0];

      //console.log(response);

      const parsedAthleteDetails = {
        id: parseInt(athleteData.id, 10),
        user_id: parseInt(athleteData.user.id, 10),
        name: athleteData.user.name,
        bio: athleteData.user.bio,
        role: "Athlete",
        club_id: athleteData.club?.id || null,
        club: athleteData.club?.user?.name || null,
        position: athleteData.position,
        age: athleteData.age,
        height: parseFloat(athleteData.height),
        weight: parseFloat(athleteData.weight),
        experiences:
          response.experience?.map((exp: Experience) => ({
            id: exp.id,
            name: exp.name,
            date: exp.date,
            description: exp.description,
          })) || null,
      };

      dispatch(setAthleteDetails(parsedAthleteDetails));
    } catch (error: any) {
      console.error("Error fetching athlete details:", error);
      dispatch(
        setAthleteError(error.message || "Failed to fetch athlete details")
      );
    }
  };

export const fetchCoachDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setCoachLoading(true));

      const response = await requestApi(`/coach/${id}`);
      const coachData = response.coach[0];

      const parsedCoachDetails = {
        id: parseInt(coachData.id, 10),
        user_id: parseInt(coachData.user.id, 10),
        name: coachData.user.name,
        bio: coachData.user.bio,
        role: "Coach",
        club_id: coachData.club?.id || null,
        club: coachData.club?.user?.name || null,
        specialty: coachData.specialty,
      };

      dispatch(setCoachDetails(parsedCoachDetails));
    } catch (error: any) {
      console.error("Error fetching coach details:", error);
      dispatch(setCoachError(error.message || "Failed to fetch coach details"));
    }
  };

export const fetchClubDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setClubLoading(true));

      const response = await requestApi(`/club/${id}`);
      const clubData = response.club[0];

      const parsedClubDetails = {
        id: parseInt(clubData.id, 10),
        user_id: parseInt(clubData.user.id, 10),
        name: clubData.user.name,
        bio: clubData.user.bio,
        role: "Club",
        federation_id: clubData.federation,
        federation: clubData.club?.user?.name || null,
        location: clubData.location,
        founded_year: clubData.founded_year,
      };

      dispatch(setClubDetails(parsedClubDetails));
    } catch (error: any) {
      console.error("Error fetching club details:", error);
      dispatch(setClubError(error.message || "Failed to fetch club details"));
    }
  };

export const fetchFederationDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setFederationLoading(true));

      const response = await requestApi(`/federation/${id}`);
      const federationData = response.federation[0];

      const parsedFederationDetails = {
        id: parseInt(federationData.id, 10),
        user_id: parseInt(federationData.user.id, 10),
        name: federationData.user.name,
        bio: federationData.user.bio,
        role: "Federation",
        location: federationData.location,
        country: federationData.country,
        founded_year: federationData.founded_year,
      };

      dispatch(setFederationDetails(parsedFederationDetails));
    } catch (error: any) {
      console.error("Error fetching federation details:", error);
      dispatch(
        setFederationError(
          error.message || "Failed to fetch federation details"
        )
      );
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

export const getProfileData = (
  role: string | null,
  details: any,
  clubs?: Array<{ id: number; name: string }>
) => {
  if (role === "Athlete" && details) {
    return {
      title: details.name,
      avatar: details.name.charAt(0),
      fields: [
        {
          label: "Club",
          value: details.club_id || "",
          displayValue: details.club || "N/A",
          type: "select",
          options: clubs,
        },
        { label: "Position", value: details.position || "N/A" },
        { label: "Age", value: details.age },
        { label: "Height", value: `${details.height} cm` },
        { label: "Weight", value: `${details.weight} kg` },
      ],
    };
  } else if (role === "Coach" && details) {
    return {
      title: details.name,
      avatar: details.name.charAt(0),
      fields: [
        {
          label: "Club",
          value: details.club_id || "",
          displayValue: details.club || "N/A",
          type: "select",
          options: clubs,
        },
        { label: "Specialty", value: details.specialty || "N/A" },
      ],
    };
  } else if (role === "Club" && details) {
    return {
      title: details.name,
      avatar: details.name.charAt(0),
      fields: [
        { label: "Location", value: details.location || "N/A" },
        { label: "Founded Year", value: details.founded_year || "N/A" },
      ],
    };
  } else if (role === "Federation" && details) {
    return {
      title: details.name,
      avatar: details.name.charAt(0),
      fields: [
        { label: "Country", value: details.country || "N/A" },
        { label: "Location", value: details.location || "N/A" },
        { label: "Founded Year", value: details.founded_year || "N/A" },
      ],
    };
  } else {
    return { title: "Loading...", fields: [] };
  }
};

export const getBioData = (role: string | null, bio: string) => {
  if (bio) {
    return {
      title: "BIO",
      bioText: bio || "N/A",
    };
  } else {
    return { title: "Loading...", bioText: null };
  }
};

export const getExperienceData = (
  role: string | null,
  experiences: Experience[]
) => {
  if (experiences && experiences.length > 0) {
    return {
      experiences: experiences,
    };
  } else {
    return {
      experiences: [],
    };
  }
};
