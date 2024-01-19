import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Application } from "../Interfaces/dataStructures/ApplicationInterface";
import { KingdomWithTerm } from "../Interfaces/dataStructures/KingdomInterface";


interface ApplicationState {
  applicationsAll: Application[],
  applications: Application[],  // все заявки пользователя
  currentApplication: Application | null,  // выбранная заявка (с княжествами)
  applicationToCreate: Application | null,  // заявка-черновик
  draftApplicationId: number,
}

const initialState: ApplicationState = {
  applicationsAll: [],
  applications: [],
  currentApplication: null,
  applicationToCreate: null,
  draftApplicationId: 0,
}

export const ApplicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    ClearStore: (state) => {
      state.applicationsAll = [],
      state.applications = [],
      state.currentApplication = null,
      state.applicationToCreate = null,
      state.draftApplicationId = 0
    },
    SetApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    SetApplicationToCreate: (state, action: PayloadAction<Application>) => {
      state.applicationToCreate = action.payload;
    },
    CreateApplicationToCreate: (state, action: PayloadAction<Application>) => {
      state.applicationToCreate = action.payload;

      state.applications.push(state.applicationToCreate);
    },
    DeleteApplicationToCreate: (state) => {
      state.applicationToCreate = null;
    },
    SetCurrentApplication: (state, action: PayloadAction<Application | null>) => {
      state.currentApplication = action.payload;
    },
    DeleteCurrentApplication: (state) => {
      state.currentApplication = null;
    },
    AddKingdomToApplication: (state, action: PayloadAction<KingdomWithTerm>) => {
      if (state.applicationToCreate?.KingdomsWithTerm) {
        state.applicationToCreate?.KingdomsWithTerm.push(action.payload);

        return;
      }

      state.applicationToCreate!.KingdomsWithTerm = [action.payload];
    },
    DeleteKingdomFromApplication: (state, action: PayloadAction<Number>) => {
      if (!(state.applicationToCreate?.KingdomsWithTerm)) return;

      state.applicationToCreate.KingdomsWithTerm = state.applicationToCreate.KingdomsWithTerm
        .filter((kingdom: KingdomWithTerm) => kingdom.Kingdom.Id !== action.payload);
    },
    UpdateApplicationStatus: (state) => {
      if (!(state.applicationToCreate)) return;

      state.applicationToCreate.State = 'На рассмотрении';
      state.applications.push(state.applicationToCreate);
      state.applicationToCreate = null;
    },
    UpdateApplicationRuler: (state, action: PayloadAction<string>) => {
      if (!(state.applicationToCreate && state.currentApplication)) return;
      
      state.applicationToCreate.Ruler = action.payload;
      state.currentApplication.Ruler = action.payload;
    },
    DeleteApplication: (state, action: PayloadAction<Number>) => {
      state.applications = state.applications.filter((application: Application) => {
        if (application.Id !== action.payload) {
          return application;
        }
      })
    },
    UpdateKingdomFromApplication: (state, action: PayloadAction<KingdomWithTerm>) => {
      const nestedApplication = state.applicationToCreate?.KingdomsWithTerm.find(
        kingdom => kingdom.Kingdom.Id === action.payload.Kingdom.Id
      );
    
      if (!nestedApplication) return;
    
      state.applicationToCreate!.KingdomsWithTerm = state.applicationToCreate!.KingdomsWithTerm.map(
        kingdom => {
          if (kingdom.Kingdom.Id === nestedApplication.Kingdom.Id) {
            return nestedApplication;
          }
          return kingdom;
        }
      );
    },
    SetDraftApplicationId: (state, action: PayloadAction<number>) => {
      state.draftApplicationId = action.payload;
      console.log(state.draftApplicationId)
    },

    // moderator reducers

    SetApplicationsAll: (state, action: PayloadAction<Application[]>) => {
      state.applicationsAll = action.payload;
    },
    
  }
});

export const applicationReducer = ApplicationSlice.reducer;
export const { 
  ClearStore,
  SetApplications, 
  SetApplicationToCreate,
  CreateApplicationToCreate,
  SetCurrentApplication, 
  DeleteCurrentApplication,
  AddKingdomToApplication,
  DeleteApplicationToCreate,
  DeleteKingdomFromApplication,
  UpdateApplicationStatus,
  UpdateApplicationRuler,
  UpdateKingdomFromApplication,
  DeleteApplication,
  SetDraftApplicationId,
  SetApplicationsAll,
} = ApplicationSlice.actions;
