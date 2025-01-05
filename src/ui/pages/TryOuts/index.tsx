import FeedLayout from "../../Layout/FeedLayout";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getStoredRole } from "../../../core/utils/globalUtils";

const TryOuts = () => {
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
  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <div className="sub-cards-container flex">
            <div className="flex column"></div>
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default TryOuts;
