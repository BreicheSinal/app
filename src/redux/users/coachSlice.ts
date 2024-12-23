import { createSlice } from "@reduxjs/toolkit";

interface CoachDetails {
  id: number;
  user_id: number;
  club_id: number;
  name: string;
  bio: string;
  specialty: string;
}

interface CoachState {
    details: CoachDetails | null;
  }
  
  const initialState: CoachState = {
    details: null,
  };