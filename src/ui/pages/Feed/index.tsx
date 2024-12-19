import FeedLayout from "../../Layout/FeedLayout";

import CustomCard from "../../components/CustomCard";

import "./style.css";

const Feed = () => {
  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <CustomCard
            width={350}
            title="Card"
            content="HALA MADRID!"
            showButtons={false}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <CustomCard
                width={500}
                title="Card 1"
                content="HALA MADRID!"
                showButtons={false}
              />
              <CustomCard
                width={500}
                title="Card 2"
                content="HALA MADRID!"
                showButtons={false}
              />
            </div>

            <CustomCard
              width={350}
              title="Card 1"
              content="HALA MADRID!"
              showButtons={false}
            />
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default Feed;
