import { useMemo, memo } from "react";

import FeedLayout from "../../Layout/FeedLayout";

import { ProfileCardView } from "../../components/ProfileCard";

import { getProfileData } from "../../../core/utils/fetchDetails";

import {
  getStoredRole,
  UserDetails,
  createSetters,
} from "../../../core/utils/globalUtils";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import ConnectionsCard from "../../components/ConnectionCard";

import "./style.css";
import PendingConnectionCard from "../../components/PendingConnCard";

const Connections = memo(() => {
  const role = getStoredRole();

  createSetters(role!);

  const details = useSelector((state: RootState) => {
    switch (role) {
      case "Athlete":
        return state.athlete.details;
      case "Coach":
        return state.coach.details;
      case "Club":
        return state.club.details;
      case "Federation":
        return state.federation.details;
      default:
        return null;
    }
  });

  /* getting data */
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
            showConnect={false}
            role={role}
            userId={details?.user_id}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              {details?.user_id && (
                <PendingConnectionCard userId={details?.user_id} />
              )}
            </div>
            {details?.user_id && (
              <ConnectionsCard currentUserId={details?.user_id} width={250} />
            )}
          </div>
        </div>
      </FeedLayout>
    </div>
  );
});

export default Connections;
