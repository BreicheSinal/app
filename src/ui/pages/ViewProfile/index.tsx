import { useMemo } from "react";

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

import {
  getStoredRole,
  UserDetails,
  AthleteDetails,
  CoachDetails,
} from "../../../core/utils/globalUtils";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import "./style.css";

const ViewProfile = () => {
  const role = getStoredRole();

  const details = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.details
      : role === "Coach"
      ? state.coach.details
      : role === "Club"
      ? state.club.details
      : state.federation.details
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

              <ExperienceCardView
                width={600}
                experiences={experienceData.experiences}
              />
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
