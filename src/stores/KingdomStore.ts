import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kingdom } from '../Interfaces/dataStructures/KingdomInterface';

interface KingdomState {
  kingdoms: Kingdom[],
  kingdom: Kingdom | null,
}

const initialState: KingdomState = {
  kingdoms: [],
  kingdom: null,
};

export const kingdomSlice = createSlice({
  name: 'kingdom',
  initialState,
  reducers: {
    SetKingdoms: (state, action: PayloadAction<Kingdom[]>) => {
      state.kingdoms = action.payload;
    },
    SetKingdom: (state, action: PayloadAction<Kingdom>) => {
      state.kingdom = action.payload;
    },
    DeleteKingdom: (state) => {
      state.kingdom = null;
    },
    UpdateKingdomStatus: (state, action: PayloadAction<{id: number, state: string}>) => {
      state.kingdoms = state.kingdoms.map((kingdom: Kingdom) => {
        if (kingdom.Id != action.payload.id) {
          return kingdom;
        } else {
          const updatedKingdom: Kingdom = {...kingdom};
          updatedKingdom.Id = action.payload.id;
          updatedKingdom.State = action.payload.state;
          return updatedKingdom;
        }
      });
    }
  },
});

export const { SetKingdoms,
  SetKingdom,
  DeleteKingdom,
  UpdateKingdomStatus } = kingdomSlice.actions;
export const kingdomReducer = kingdomSlice.reducer;
