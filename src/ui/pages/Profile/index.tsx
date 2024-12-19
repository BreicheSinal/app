import FeedLayout from "../../Layout/FeedLayout";

import CustomCard from "../../components/CustomCard";
import ProfileCard from "../../components/ProfileCard";
import { CardData } from "../../components/CustomCard";

import "./style.css";

const Profile = () => {
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

  // mock custom cards data
  const bio: CardData = {
    title: "BIO",
    sections: [
      {
        type: "text",
        content: "Qorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        type: "text",
        content: "Qorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  };

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

  const handleEdit = (field: string) => {};
  const middleEdit = () => {};

  return (
    <div className="feed-container">
      <FeedLayout>
        <div className="cards-container flex">
          <ProfileCard
            width={300}
            data={profileData}
            showEdit={true}
            onEdit={handleEdit}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <CustomCard
                width={600}
                data={bio}
                showEdit={true}
                onEdit={middleEdit}
              />
              <CustomCard
                width={600}
                data={bio}
                showEdit={true}
                onEdit={middleEdit}
              />
            </div>

            <CustomCard
              width={250}
              data={staffData}
              showEdit={true}
              onEdit={middleEdit}
            />
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default Profile;
