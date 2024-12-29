import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FeedLayout from "../../Layout/FeedLayout";
import { ExperienceCardView } from "../../components/ExpCard";
import { BioCardView } from "../../components/BioCard";
import CustomCard from "../../components/CustomCard";
import { ProfileCardView } from "../../components/ProfileCard";
import { CardData } from "../../components/CustomCard";

import {
  getBioData,
  getProfileData,
  getExperienceData,
} from "../../../core/utils/fetchDetails";

import { fetchSearchedUserDetails } from "../../../core/utils/fetchDetails";

import {
  UserDetails,
  AthleteDetails,
  CoachDetails,
} from "../../../core/utils/globalUtils";

const ViewProfile = () => {
  const { userId, role } = useParams<{ userId: string; role: string }>();
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        setError(null);
        const details = await fetchSearchedUserDetails(role!, parseInt(userId));
        setUserData(details);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userId, role]);

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
          <div>Loading...</div>
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
          <ProfileCardView width={300} data={profileData} />

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
            <CustomCard
              width={250}
              data={staffData}
              showEdit={false}
              onEdit={() => {}}
            />
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default ViewProfile;
