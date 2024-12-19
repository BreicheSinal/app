import FeedLayout from "../../Layout/FeedLayout";

import CustomCard from "../../components/CustomCard";
import ProfileCard from "../../components/ProfileCard";

import "./style.css";

const Feed = () => {
  // mock data
  const profileData = {
    title: "Lebanese Football Federation",
    fields: [
      {
        label: "Country",
        value: "Lebanon",
      },
      {
        label: "Founded Year",
        value: 1933,
      },
    ],
  };

  const handleEdit = (field: string) => {};

  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <ProfileCard
            width={300}
            data={profileData}
            showEdit={false}
            onEdit={handleEdit}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <CustomCard
                width={600}
                title="Card 1"
                content="HALA MADRID!"
                showButtons={false}
              />
              <CustomCard
                width={600}
                title="Card 2"
                content="HALA MADRID!"
                showButtons={false}
              />
            </div>

            <CustomCard
              width={250}
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
