import { DataService } from "../../config/dataservice";
import actions from "./actions";
import { message } from "antd";

const {

    getModelDetailsBegin,
    getModelDetailsSuccess,
    getModelDetailsErr,

    getModalitiesModelsBegin,
    getModalitiesModelsSuccess,
    getModalitiesModelsErr,

    postModelTryoutBegin,
    postModelTryoutSuccess,
    postModelTryoutErr,

    createModelBegin,
    createModelSuccess,
    createModelErr,

    updateModelBegin,
    updateModelSuccess,
    updateModelErr,

    getSingleModelBegin,
    getSingleModelSuccess,
    getSingleModelErr,


} = actions;


const GetAllModels = () => {
    return async (dispatch) => {
        try {
            await dispatch(getModelDetailsBegin());
            const response = await DataService.get('/model');
            if (response.data !== null && response.data) {
                await dispatch(getModelDetailsSuccess(response.data));
            } else {
                if ( response.data) {
                    await dispatch(getModelDetailsSuccess([]));
                }
                throw response.data.message;
            }
        } catch (err) {
            await dispatch(getModelDetailsErr(err));
        }
    };
}

// // get modalities models
const GetModalitiesModels = (modality) => {
    return async (dispatch) => {
        try {
            await dispatch(getModalitiesModelsBegin());
            console.log("modality", modality);
            const response = await DataService.get(`/model/modality/${modality}`);
            if (response.data !== null && response.data) {
                await dispatch(getModalitiesModelsSuccess(response.data));
            } 
            else {
                if ( response.data.Error === true) {
                    await dispatch(getModalitiesModelsSuccess([]));
                    message.error(response.data.message);
                }
                throw response.data.message;
            }
        } catch (err) {
            await dispatch(getModalitiesModelsErr(err));
        }
    };
}

// // create-models
const CreateModels = (values) => {
    return async (dispatch) => {
        try {
            dispatch(createModelBegin());
            const response = await DataService.post(`/model/create`, values);
            if (response.data && response.data.Error === false) {
                await dispatch(createModelSuccess(response.data));
                message.success(response.data.message)
            }
            else {
                await dispatch(createModelSuccess(null));
                if (response.data && response.data.Error === true) {
                    message.error(response.data.message)
                }
                throw response.data.message;
            }
        } catch (err) {
            await dispatch(createModelErr(err));
        }
    };
};

// // get single model
const GetSingleModel = (model) => {
    return async (dispatch) => {
        try {
            await dispatch(getSingleModelBegin());
            const response = await DataService.get(`/model/${model}`);
            if (response.data !== null && response.data) {
                await dispatch(getSingleModelSuccess(response.data));
            } else {
                if ( response.data) {
                    await dispatch(getSingleModelSuccess([]));
                }
                throw response.data.message;
            }
        } catch (err) {
            await dispatch(getSingleModelErr(err));
        }
    };
}

// // update-models
const UpdateModels = (values) => {
    return async (dispatch) => {
        try {
            dispatch(updateModelBegin());
            const response = await DataService.post(`/model/update`, values);
            if (response.data && response.data.Error === false) {
                await dispatch(updateModelSuccess(response.data));
                message.success(response.data.message);
            } else {
                await dispatch(updateModelSuccess(null));
                if (response.data && response.data.Error === true) {
                    message.error(response.data.message);
                }
                throw response.data.message;
            }
        } catch (err) {
            await dispatch(updateModelErr(err));
        }
    };
};

// // post model tryout
// // post model tryout (multipart/form-data)
 const PostModelTryout = (formData) => {
    return async (dispatch) => {
      dispatch(postModelTryoutBegin());
      try {
        const response = await DataService.post(`/interaction/predict`, formData);
        dispatch(postModelTryoutSuccess(response.data));
      } catch (err) {
        dispatch(postModelTryoutErr(err));
      }
    };
  };
  

export {
    GetAllModels,
    GetModalitiesModels,
    GetSingleModel,
    CreateModels,
    UpdateModels,
    PostModelTryout,
};

