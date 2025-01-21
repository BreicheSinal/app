import { FC } from "react";

import FeedLayout from "../../Layout/FeedLayout";

import { ProfileCardView } from "../../components/ProfileCard";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
import { UserDetails } from "../../../core/utils/globalUtils";

import { getProfileData } from "../../../core/utils/fetchDetails";

import ViewTryouts from "../../components/ViewTryOutCard";
import { MyTryouts } from "../../components/ViewTryOutCard/MyTryOutList";
import InitialLoader from "../../components/LoadingSpinner";

import "./style.css";

const ViewTryOuts: FC = () => {
  const state = store.getState();
  const { role } = state.auth;

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

  return (
    <>
      <InitialLoader />
      <div className="feed-container">
        <FeedLayout>
          <div className="cards-container flex">
            <ProfileCardView
              width={300}
              data={profileData}
              role={role!}
              showConnect={false}
            />

            <div className="sub-cards-container flex">
              <div className="flex column">
                <ViewTryouts />
              </div>
            </div>
            <MyTryouts />
          </div>
        </FeedLayout>
      </div>
    </>
  );
};

export default ViewTryOuts;
