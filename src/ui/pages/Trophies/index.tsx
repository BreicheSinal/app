import { useMemo } from "react";
import FeedLayout from "../../Layout/FeedLayout";
import { ProfileCardView } from "../../components/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getProfileData } from "../../../core/utils/fetchDetails";
import { getStoredRole, UserDetails } from "../../../core/utils/globalUtils";
import TrophiesManager from "../../components/Trophy";
import { MyTrophies } from "../../components/Trophy/MyTrophies";

const Trophies = () => {
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

  const profileData = useMemo(
    () =>
      details
        ? getProfileData(role, details as UserDetails)
        : { title: "Loading...", fields: [] },
    [role, details]
  );

  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <ProfileCardView
            width={300}
            data={profileData}
            role={role}
            showConnect={false}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <TrophiesManager role={role} />
            </div>
          </div>
          <MyTrophies />
        </div>
      </FeedLayout>
    </div>
  );
};

export default Trophies;
