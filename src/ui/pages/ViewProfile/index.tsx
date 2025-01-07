import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FeedLayout from "../../Layout/FeedLayout";
import { ExperienceCardView } from "../../components/ExpCard";
import { BioCardView } from "../../components/BioCard";
import { ProfileCardView } from "../../components/ProfileCard";

import { CircularProgress } from "@mui/material";

import {
  getBioData,
  getProfileData,
  getExperienceData,
  fetchConnectionStatus,
} from "../../../core/utils/fetchDetails";

import { fetchSearchedUserDetails } from "../../../core/utils/fetchDetails";
import { createConnectionRequest } from "../../../core/utils/addDetails";

import {
  UserDetails,
  AthleteDetails,
  CoachDetails,
  createSetters,
  getStoredRole,
  ValidRoleType,
} from "../../../core/utils/globalUtils";

import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import ConnectionsCard from "../../components/ConnectionCard";

const ViewProfile = () => {
  const { userId, role } = useParams<{ userId: string; role: ValidRoleType }>();
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  const roleCurrentUser = getStoredRole();
  createSetters(roleCurrentUser!);

  const currentUserId = useSelector((state: RootState) => {
    switch (roleCurrentUser) {
      case "Athlete":
        return state.athlete.details?.user_id;
      case "Coach":
        return state.coach.details?.user_id;
      case "Club":
        return state.club.details?.user_id;
      case "Federation":
        return state.federation.details?.user_id;
      default:
        return null;
    }
  });

  const connect = async () => {
    try {
      setConnectionStatus("pending");

      await createConnectionRequest(currentUserId!, Number(userId));

      const newStatus = await fetchConnectionStatus(
        currentUserId!,
        Number(userId)
      );
      setConnectionStatus(newStatus);
    } catch (error) {
      console.error("Connection error:", error);
      setConnectionStatus(null);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        setError(null);
        const details = await fetchSearchedUserDetails(role!, parseInt(userId));
        setUserData(details);

        // Fetch connection status if we have both IDs
        if (currentUserId) {
          const status = await fetchConnectionStatus(
            currentUserId,
            parseInt(userId)
          );
          setConnectionStatus(status);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userId, role, currentUserId]);

  const profileData = useMemo(
    () =>
      userData
        ? getProfileData(userData.role, userData)
        : { title: "Loading...", fields: [] },
    [userData]
  );

  const bioData = useMemo(() => getBioData(userData?.bio || ""), [userData]);

  const experienceData = useMemo(() => {
    if (!userData || (userData.role !== "Athlete" && userData.role !== "Coach"))
      return { experiences: [] };
    return getExperienceData(
      (userData as AthleteDetails | CoachDetails).experiences || []
    );
  }, [userData]);

  if (isLoading) {
    return (
      <div className="feed-container">
        <FeedLayout>
          <div>
            <CircularProgress />
          </div>
        </FeedLayout>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-container">
        <FeedLayout>
          <div>Error: {error}</div>
        </FeedLayout>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <ProfileCardView
            width={300}
            data={profileData}
            showConnect={true}
            connectedUserId={Number(userId)}
            userId={currentUserId!}
            connectionStatus={connectionStatus!}
            onConnect={connect}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <BioCardView width={600} bioText={bioData.bioText} />

              {(userData?.role === "Athlete" || userData?.role === "Coach") && (
                <ExperienceCardView
                  width={600}
                  experiences={experienceData.experiences}
                />
              )}
            </div>
            {userId && <ConnectionsCard currentUserId={Number(userId)} />}
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default ViewProfile;
