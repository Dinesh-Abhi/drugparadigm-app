// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { getUserInfoReducer, deleteUserReducer } from "./auth/reducers";
import {
  getDrugModalitiesReducer,
  postDrugModalitiesReducer,
  updateDrugModalitiesReducer,
} from "./drugmodailities/reducers";

import {
  GetAllModelsReducer,
  CreateModelsReducer,
  UpdateModelsReducer,
  PostModelTryoutReducer,
  GetModalitiesModelsReducer,
  GetSingleModelReducer,
} from "./models/reducers";

const rootReducers = combineReducers({
  // auth reducers
  getUserInfoReducerRes: getUserInfoReducer,
  deleteUserReducerRes: deleteUserReducer,
  // drugmodalities reducers
  getDrugModalitiesReducerRes: getDrugModalitiesReducer,
  postDrugModalitiesReducerRes: postDrugModalitiesReducer,
  updateDrugModalitiesReducerRes: updateDrugModalitiesReducer,

  // models reducers
  GetAllModelsReducerRes: GetAllModelsReducer,
  GetSingleModelReducerRes: GetSingleModelReducer,
  GetModalitiesModelsReducerRes: GetModalitiesModelsReducer,

  CreateModelsReducerRes: CreateModelsReducer,
  UpdateModelsReducerRes: UpdateModelsReducer,
  PostModelTryoutReducerRes: PostModelTryoutReducer,
});

export default rootReducers;
