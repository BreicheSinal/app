import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { requestApi } from "../../../core/utils/request";

import FeedLayout from "../../Layout/FeedLayout";

import CustomCard from "../../components/CustomCard";
import ProfileCard from "../../components/ProfileCard";
import { CardData } from "../../components/CustomCard";

import "./style.css";

const Feed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const role = localStorage.getItem("role");
      const specificRoleId = localStorage.getItem("specificRoleId");

      if (!role || !specificRoleId) {
        navigate("/login");
        return;
      }

      try {
        let endpoint = "";
        switch (role) {
          case "Athlete":
            endpoint = `/athlete/${specificRoleId}`;
            break;
          case "Coach":
            endpoint = `/coach/${specificRoleId}`;
            break;
          case "Club":
            endpoint = `/club/${specificRoleId}`;
            break;
          case "Federation":
            endpoint = `/federation/${specificRoleId}`;
            break;
          default:
            throw new Error("Invalid role");
        }

        console.log("Fetching from endpoint:", endpoint);

        const userDetails = await requestApi(endpoint, "GET");

        console.log("im here", userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

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
            showEdit={false}
            onEdit={handleEdit}
          />

          <div className="sub-cards-container flex">
            <div className="flex column">
              <CustomCard
                width={600}
                data={bio}
                showEdit={false}
                onEdit={middleEdit}
              />
              <CustomCard
                width={600}
                data={bio}
                showEdit={false}
                onEdit={middleEdit}
              />
            </div>

            <CustomCard
              width={250}
              data={staffData}
              showEdit={false}
              onEdit={middleEdit}
            />
          </div>
        </div>
      </FeedLayout>
    </div>
  );
};

export default Feed;
