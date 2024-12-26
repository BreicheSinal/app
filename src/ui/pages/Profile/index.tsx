import { useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import FeedLayout from "../../Layout/FeedLayout";

import BioCard from "../../components/BioCard";
import CustomCard from "../../components/CustomCard";
import ProfileCard from "../../components/ProfileCard";
import { CardData } from "../../components/CustomCard";

import {
  fetchAthleteDetails,
  fetchCoachDetails,
  fetchClubDetails,
  fetchFederationDetails,
  getBioData,
  getProfileData,
} from "../../../core/utils/fetchDetails";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

import { requestApi } from "../../../core/utils/request";

import "./style.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const athleteDetails = useSelector(
    (state: RootState) => state.athlete.details
  );

  const coachDetails = useSelector((state: RootState) => state.coach.details);

  const clubDetails = useSelector((state: RootState) => state.club.details);
  const federationDetails = useSelector(
    (state: RootState) => state.federation.details
  );

  const role = localStorage.getItem("role") || "";

  const isLoading = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.loading
      : role === "Coach"
      ? state.coach.loading
      : role === "Club"
      ? state.club.loading
      : state.federation.loading
  );

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


  const profileData = getProfileData(
    role,
    role === "Athlete"
      ? athleteDetails
      : role === "Coach"
      ? coachDetails
      : role === "Club"
      ? clubDetails
      : federationDetails
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

  const editBio = async (updatedBio: string) => {
    try {
      const specificRoleId = localStorage.getItem("specificRoleId");
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
            onEdit={() => {}}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <BioCard
                width={600}
                bioText={bioData.bioText}
                showEdit={true}
                onEdit={editBio}
                isLoading={isLoading}
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
