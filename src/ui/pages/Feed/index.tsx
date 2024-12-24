import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import FeedLayout from "../../Layout/FeedLayout";

import CustomCard from "../../components/CustomCard";
import ProfileCard from "../../components/ProfileCard";
import { CardData } from "../../components/CustomCard";

import { fetchAthleteDetails } from "../../../core/utils/fetchDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

import "./style.css";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const specificRoleId = localStorage.getItem("specificRoleId");

    const athleteDetails = useSelector(
      (state: RootState) => state.athlete.details
    );

    if (!role || !specificRoleId) {
      navigate("/login");
      return;
    }

    try {
      const id = parseInt(specificRoleId);

      switch (role) {
        case "Athlete":
          dispatch(fetchAthleteDetails(id));
          break;
        case "Coach":
          dispatch(fetchCoachDetails(id));
          break;
        case "Club":
          dispatch(fetchClubDetails(id));
          break;
        case "Federation":
          dispatch(fetchFederationDetails(id));
          break;
        default:
          throw new Error("Invalid role");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      navigate("/login");
    }
  }, [navigate, dispatch]);

  /*// mock data
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
  };*/

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
