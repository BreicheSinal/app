import { createSlice } from "@reduxjs/toolkit";

interface AthleteDetails {
  id: number;
  user_id: number;
  name: string;
  role: string;
  club_id: number;
  position: string;
  age: number;
  height: number;
  weight: number;
}

interface AthleteSate {
  details: AthleteDetails | null;
}

const initialState: AthleteSate = {
  details: null,
};
