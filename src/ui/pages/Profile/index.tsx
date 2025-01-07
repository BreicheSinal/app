import { useEffect, useMemo, useState } from "react";

import FeedLayout from "../../Layout/FeedLayout";

import { ExperienceCard } from "../../components/ExpCard";
import { BioCard } from "../../components/BioCard";
import { ProfileCard } from "../../components/ProfileCard";

import { deleteExp } from "../../../core/utils/deleteDetails";

import {
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

import {
  Experience,
  ClubOption,
  getStoredRole,
  UserDetails,
  AthleteDetails,
  CoachDetails,
} from "../../../core/utils/globalUtils";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

import StaffCard from "../../components/StaffCard";
import ConnectionsCard from "../../components/ConnectionCard";

import "./style.css";

const Profile = () => {
  const role = getStoredRole();
  const dispatch = useDispatch<AppDispatch>();

  const [clubs, setClubs] = useState<ClubOption[]>([]);

  const details = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.details
      : role === "Coach"
      ? state.coach.details
      : role === "Club"
      ? state.club.details
      : state.federation.details
  );

  const isLoading = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.loading
      : role === "Coach"
      ? state.coach.loading
      : role === "Club"
      ? state.club.loading
      : state.federation.loading
  );

  const loadClubs = async () => {
    try {
      const clubOptions = await fetchClubOptions();
      setClubs(clubOptions);
    } catch (error) {
      console.error("Error loading clubs:", error);
    }
  };

  /* use effects */
  useEffect(() => {
    loadClubs();
  }, []);

  /* getting data */
  const profileData = useMemo(
    () =>
      details
        ? getProfileData(role, details as UserDetails, clubs)
        : { title: "Loading...", fields: [] },
    [role, details, clubs]
  );

  const bioData = useMemo(() => getBioData(details?.bio || ""), [details]);

  const experienceData = useMemo(() => {
    if (!details || (role !== "Athlete" && role !== "Coach"))
      return { experiences: [] };
    return getExperienceData(
      (details as AthleteDetails | CoachDetails).experiences || []
    );
  }, [role, details]);

  /* editing data */
  const editUserBio = async (updatedBio: string) => {
    if (!details?.user_id && !details?.id) {
      throw new Error("Athlete details not found");
    }
    await editBio(updatedBio, dispatch);
  };

  const editUserProfile = async (updatedFields: {
    [key: string]: string | number | null;
  }) => {
    try {
      await editProfile(updatedFields, role!, dispatch);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const editUserExperience = async (updatedExp: Experience) => {
    if (!details?.id) {
      throw new Error("Athlete details not found");
    }
    await editExperience(updatedExp, dispatch, updatedExp.id, details.id);
  };

  /* adding data */
  const addUserExperience = async (newExperience: Omit<Experience, "id">) => {
    if (!details?.user_id) {
      throw new Error("Athlete details not found");
    }
    await addExperience(newExperience, dispatch, details.user_id);
  };

  /* deleting data */
  const deleteUserExp = async (expId: number) => {
    try {
      await deleteExp(dispatch, expId);
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
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
              {(role === "Athlete" || role === "Coach") && (
                <ExperienceCard
                  width={600}
                  experiences={experienceData.experiences}
                  addition={addUserExperience}
                  edit={editUserExperience}
                  showEdit={true}
                  delete={deleteUserExp}
                />
              )}

              {role === "Club" && (
                <StaffCard
                  clubId={details?.id || 0}
                  width={615}
                  showEdit={true}
                  onEdit={() => {}}
                />
              )}
            </div>
            {details?.user_id && (
              <ConnectionsCard currentUserId={details?.user_id} />
            )}
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default Profile;
