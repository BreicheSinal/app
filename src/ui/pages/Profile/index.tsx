import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import FeedLayout from "../../Layout/FeedLayout";

import ExperienceCard from "../../components/ExpCard";
import BioCard from "../../components/BioCard";
import CustomCard from "../../components/CustomCard";
import ProfileCard from "../../components/ProfileCard";
import { CardData } from "../../components/CustomCard";

import {
  fetchAthleteDetails,
  fetchCoachDetails,
  fetchClubDetails,
  fetchFederationDetails,
  fetchClubOptions,
  getBioData,
  getProfileData,
  getExperienceData,
} from "../../../core/utils/fetchDetails";

import {
  editExperience,
  editBio,
  editProfile,
} from "../../../core/utils/editDetails";
import { addExperience } from "../../../core/utils/addDetails";

import { Experience, ClubOption } from "../../../core/utils/interfaces";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

import "./style.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const role = localStorage.getItem("role") || "";

  const [clubs, setClubs] = useState<ClubOption[]>([]);

  const athleteDetails = useSelector(
    (state: RootState) => state.athlete.details
  );

  const coachDetails = useSelector((state: RootState) => state.coach.details);

  const clubDetails = useSelector((state: RootState) => state.club.details);
  const federationDetails = useSelector(
    (state: RootState) => state.federation.details
  );

  const loadClubs = async () => {
    try {
      const clubOptions = await fetchClubOptions();
      setClubs(clubOptions);
    } catch (error) {
      console.error("Error loading clubs:", error);
    }
  };

  const isLoading = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.loading
      : role === "Coach"
      ? state.coach.loading
      : role === "Club"
      ? state.club.loading
      : state.federation.loading
  );

  /* use effects */
  useEffect(() => {
    const role = localStorage.getItem("role");
    const specificRoleId = localStorage.getItem("specificRoleId");

    if (!role || !specificRoleId) {
      navigate("/login");
      return;
    }

    try {
      const id = parseInt(specificRoleId);

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
      console.error("Error fetching user details:", error);
      navigate("/login");
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    loadClubs();
  }, []);

  /* getting data */
  const profileData = useMemo(
    () =>
      getProfileData(
        role,
        role === "Athlete"
          ? athleteDetails
          : role === "Coach"
          ? coachDetails
          : role === "Club"
          ? clubDetails
          : federationDetails,
        clubs
      ),
    [role, athleteDetails, coachDetails, clubDetails, federationDetails, clubs]
  );

  const bioData = useMemo(
    () =>
      getBioData(
        role,
        role === "Athlete"
          ? athleteDetails?.bio || ""
          : role === "Coach"
          ? coachDetails?.bio || ""
          : role === "Club"
          ? clubDetails?.bio || ""
          : federationDetails?.bio || ""
      ),
    [role, athleteDetails, coachDetails, clubDetails, federationDetails]
  );

  const experienceData = useMemo(
    () =>
      getExperienceData(
        role,
        role === "Athlete"
          ? athleteDetails?.experiences || []
          : coachDetails?.experiences || []
      ),
    [role, athleteDetails, coachDetails]
  );

  /* editing data */
  const editUserBio = async (updatedBio: string) => {
    if (!athleteDetails?.user_id && !athleteDetails?.id) {
      throw new Error("Athlete details not found");
    }
    await editBio(updatedBio, dispatch);
  };

  const editUserProfile = async (updatedFields: {
    [key: string]: string | number | null;
  }) => {
    try {
      await editProfile(updatedFields, role, dispatch);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const editUserExperience = async (updatedExp: Experience) => {
    if (!athleteDetails?.id) {
      throw new Error("Athlete details not found");
    }
    await editExperience(
      updatedExp,
      dispatch,
      updatedExp.id,
      athleteDetails.id
    );
  };

  /* adding data */
  const addUserExperience = async (newExperience: Omit<Experience, "id">) => {
    if (!athleteDetails?.user_id && !athleteDetails?.id) {
      throw new Error("Athlete details not found");
    }
    await addExperience(
      newExperience,
      dispatch,
      athleteDetails.user_id,
      athleteDetails.id
    );
  };

  /* deleting data */
  const deleteExp = async () => {};

  /* MOCK DATA */
  const staffData: CardData = {
    title: "STAFF",
    sections: [
      {
        type: "list",
        content: [
          {
            name: "NAME",
            role: "ROLE",
            content: "Alice is responsible for implementing the backend APIs.",
          },
          { name: "NAME", role: "ROLE" },
          { name: "NAME", role: "ROLE" },
        ],
      },
    ],
  };

  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <ProfileCard
            width={300}
            data={profileData}
            showEdit={true}
            onEdit={editUserProfile}
            isLoading={isLoading}
            clubs={clubs}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <BioCard
                width={600}
                bioText={bioData.bioText}
                showEdit={true}
                onEdit={editUserBio}
                isLoading={isLoading}
              />

              <ExperienceCard
                experiences={experienceData.experiences}
                addition={addUserExperience}
                edit={editUserExperience}
                showEdit={true}
                delete={deleteExp}
              />
            </div>

            <CustomCard
              width={250}
              data={staffData}
              showEdit={true}
              onEdit={() => {}}
            />
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default Profile;
