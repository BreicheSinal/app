import FeedLayout from "../../Layout/FeedLayout";

import CustomCard from "../../components/CustomCard";

import "./style.css";

const Feed = () => {
  return (
    <div className="feed-container">
      <FeedLayout>
        <CustomCard width={350} />

        <div className="flex column">
          <CustomCard width={600} />
          <CustomCard width={600} />
        </div>

        <CustomCard width={350} />
      </FeedLayout>
    </div>
  );
};

export default Feed;
