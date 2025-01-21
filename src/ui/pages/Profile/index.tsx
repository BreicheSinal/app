import { useMemo, memo, useCallback } from "react";

import FeedLayout from "../../Layout/FeedLayout";

import { ExperienceCard } from "../../components/ExpCard";
import { BioCard } from "../../components/BioCard";
import { ProfileCard } from "../../components/ProfileCard";

import { deleteExp } from "../../../core/utils/deleteDetails";

import {
  getBioData,
  getProfileData,
  getExperienceData,
  getCertificateData,
} from "../../../core/utils/fetchDetails";

import {
  editExperience,
  editBio,
  editProfile,
} from "../../../core/utils/editDetails";
import { addCert, addExperience } from "../../../core/utils/addDetails";

import {
  Experience,
  UserDetails,
  AthleteDetails,
  CoachDetails,
  Certificate,
  createSetters,
} from "../../../core/utils/globalUtils";

import { useSelector, useDispatch } from "react-redux";
import store, { RootState, AppDispatch } from "../../../redux/store";

import StaffCard from "../../components/StaffCard";
import ConnectionsCard from "../../components/ConnectionCard";

import { CertificateCard } from "../../components/CertCard";
import ClubsAffiliatedCard from "../../components/AfClubsCard";
import { ViewMyTrophies } from "../../components/Trophy/ViewMyTrophies";

import "./style.css";
import InitialLoader from "../../components/LoadingSpinner";

const Profile = memo(() => {
  const state = store.getState();
  const { role } = state.auth;

  const dispatch = useDispatch<AppDispatch>();

  createSetters(role!);

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

  /* editing data */
  const editUserBio = useCallback(
    async (updatedBio: string) => {
      if (!details?.user_id && !details?.id) {
        throw new Error("Athlete details not found");
      }
      await editBio(updatedBio, dispatch);
    },
    [details?.user_id, details?.id, dispatch]
  );

  const editUserProfile = useCallback(
    async (updatedFields: { [key: string]: string | number | null }) => {
      try {
        await editProfile(updatedFields, role!, dispatch);
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    },
    [role, dispatch]
  );

  const editUserExperience = useCallback(
    async (updatedExp: Experience) => {
      if (!details?.id) {
        throw new Error("Athlete details not found");
      }
      await editExperience(updatedExp, dispatch, updatedExp.id, details.id);
    },
    [details?.id, dispatch]
  );

  /* adding data */
  const addUserExperience = useCallback(
    async (newExperience: Omit<Experience, "id">) => {
      if (!details?.user_id) {
        throw new Error("Athlete || Coach details not found");
      }
      await addExperience(newExperience, dispatch, details.user_id);
    },
    [details?.user_id, dispatch]
  );

  const addUserCert = useCallback(
    async (newCert: Omit<Certificate, "id">) => {
      if (!details?.user_id) {
        throw new Error("Coach details not found");
      }
      await addCert(newCert, dispatch, details.user_id);
    },
    [details?.user_id, dispatch]
  );

  /* deleting data */
  const deleteUserExp = useCallback(
    async (expId: number) => {
      try {
        await deleteExp(dispatch, expId);
      } catch (error) {
        console.error("Failed to delete experience:", error);
      }
    },
    [dispatch]
  );

  /* getting data */
  const profileData = useMemo(
    () =>
      details
        ? getProfileData(role, details as UserDetails)
        : { title: "Loading...", fields: [] },
    [role, details]
  );

  const bioData = useMemo(() => getBioData(details?.bio || ""), [details]);

  const experienceData = useMemo(() => {
    if (!details || (role !== "Athlete" && role !== "Coach"))
      return { experiences: [] };
    return getExperienceData(
      (details as AthleteDetails | CoachDetails).experiences || []
    );
  }, [role, details]);

  const certificationsData = useMemo(() => {
    if (!details || role !== "Coach") return { certificates: [] };
    return getCertificateData((details as CoachDetails).certificates || []);
  }, [role, details]);

  const profileCardProps = useMemo(
    () => ({
      width: 300,
      data: profileData,
      showEdit: true,
      onEdit: editUserProfile,
      isLoading,
    }),
    [profileData, editUserProfile, isLoading]
  );

  const staffCardProps = useMemo(
    () => ({
      clubId: details?.id || 0,
      width: 615,
      showEdit: true,
    }),
    [details?.id]
  );

  const clubAfCardProps = useMemo(
    () => ({
      federationId: details?.id || 0,
      width: 615,
      showEdit: true,
    }),
    [details?.id]
  );

  return (
    <>
      <InitialLoader />
      <div className="feed-container">
        <FeedLayout>
          <div className="cards-container flex">
            <ProfileCard {...profileCardProps} />
            <div className="sub-cards-container flex">
              <div className="flex column">
                <BioCard
                  width={595}
                  bioText={bioData.bioText}
                  showEdit={true}
                  onEdit={editUserBio}
                  isLoading={isLoading}
                />
                {(role === "Athlete" || role === "Coach") && (
                  <ExperienceCard
                    width={603}
                    experiences={experienceData.experiences}
                    addition={addUserExperience}
                    edit={editUserExperience}
                    showEdit={true}
                    delete={deleteUserExp}
                  />
                )}

                {role === "Athlete" && <ViewMyTrophies />}

                {role === "Coach" && (
                  <CertificateCard
                    width={603}
                    certificates={certificationsData.certificates}
                    addition={addUserCert}
                    edit={editUserExperience}
                    showEdit={true}
                    delete={deleteUserExp}
                  />
                )}

                {role === "Club" && <StaffCard {...staffCardProps} />}
                {role === "Federation" && (
                  <ClubsAffiliatedCard {...clubAfCardProps} />
                )}
                <div style={{ height: "5px" }}></div>
              </div>
              {details?.user_id && (
                <ConnectionsCard currentUserId={details?.user_id} width={245} />
              )}
              <div style={{ height: "25px" }}></div>
            </div>
          </div>
        </FeedLayout>
      </div>
    </>
  );
});

export default Profile;
