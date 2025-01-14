import FeedLayout from "../../Layout/FeedLayout";

import { ProfileCardView } from "../../components/ProfileCard";
import PostCard from "../../components/PostCard";
import Post from "../../components/Post";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { getProfileData } from "../../../core/utils/fetchDetails";

import { getStoredRole, UserDetails } from "../../../core/utils/globalUtils";
import ConnectionsCard from "../../components/ConnectionCard";

const handleLike = async () => {};
const handleComment = async () => {};

const Feed = () => {
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

  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <ProfileCardView width={300} data={profileData} showConnect={false} />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <PostCard width={600} />
              <Post
                width={600}
                userName="Name"
                //image="../../../../src/assets/icons/AthLink_noBG1.png"
                description="Qorem ipsum dolor sit amet, consectetur adipiscing elit..."
                onLike={() => handleLike()}
                onComment={() => handleComment()}
              />
            </div>
            {details?.user_id && (
              <ConnectionsCard
                currentUserId={Number(details?.user_id)}
                width={250}
              />
            )}
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default Feed;
