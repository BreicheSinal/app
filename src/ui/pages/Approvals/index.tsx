import { useMemo } from "react";
import FeedLayout from "../../Layout/FeedLayout";
import { ProfileCardView } from "../../components/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getProfileData } from "../../../core/utils/fetchDetails";
import { getStoredRole, UserDetails } from "../../../core/utils/globalUtils";
import ConnectionsCard from "../../components/ConnectionCard";
import TrophyApprovalsCard from "../../components/ApprovalsCard";

const Approvals = () => {
  const role = getStoredRole();

  const details = useSelector((state: RootState) => state.federation.details);

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
              <TrophyApprovalsCard />
            </div>
          </div>
          {details?.user_id && (
            <ConnectionsCard currentUserId={details?.user_id} width={245} />
          )}
        </div>
      </FeedLayout>
    </div>
  );
};

export default Approvals;
