import { createSlice } from "@reduxjs/toolkit";

interface ClubDetails {
  id: number;
  user_id: number;
  federation_id: number;
  bio: string;
  name: string;
  location: string;
  founded_year: number;
}
