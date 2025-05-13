import axios from "axios";
import { DataService } from "../../config/dataservice";
import actions from "./actions";
import { message } from "antd";

const {

    getDrugModalitesBegin,
    getDrugModalitesSuccess,
    getDrugModalitesErr,

    postDrugModalityBegin,
    postDrugModalitySuccess,
    postDrugModalityErr,

    updateDrugModalitiesBegin,
    updateDrugModalitiesSuccess,
    updateDrugModalitiesErr,


} = actions;

// get-drugmodalities-details
const GetAllDrugModalities = () => {
  return async (dispatch) => {
    try {
      await dispatch(getDrugModalitesBegin());
      const response = await DataService.get('/modality');
      if (response.data !== null) {
        await dispatch(getDrugModalitesSuccess(response.data));
      } else {
        if (response.data === null) {
          message.error(response.data)
          await dispatch(getDrugModalitesSuccess([]));
        }
        throw response.data.message;
      }
    } catch (err) {
      await dispatch(getDrugModalitesErr(err));
    }
  };
};



// uploaddrug-modalities
const UploadDrugModalities = (values) => {
  return async (dispatch) => {
    try {
      dispatch(postDrugModalityBegin());
      const response = await DataService.post(`/drug-modality/create`, values);
      if (response.data && response.data.Error === false) {
        await dispatch(postDrugModalitySuccess(response.data));
        message.success(response.data.message)
      }
      else {
        await dispatch(postDrugModalitySuccess(null));
        if (response.data && response.data.Error === true) {
          message.error(response.data.message)
        }
        throw response.data.message;
      }
    }
    catch (err) {
      dispatch(postDrugModalityErr(err));
    }
  }
};

const UpdateDrugModalities = (values) => {
  return async (dispatch) => {
    try {
      dispatch(updateDrugModalitiesBegin());
      const response = await DataService.post(`/drug-modality/update`, values);
      if (response.data && response.data.Error === false) {
        await dispatch(updateDrugModalitiesSuccess(response.data));
        message.success(response.data.message);
      } else {
        await dispatch(updateDrugModalitiesSuccess(null));
        if (response.data && response.data.Error === true) {
          message.error(response.data.message);
        }
        throw response.data.message;
      }
    } catch (err) {
      dispatch(updateDrugModalitiesErr(err));
    }
  };
};


export {
  GetAllDrugModalities,
  UploadDrugModalities,
  UpdateDrugModalities,
};

