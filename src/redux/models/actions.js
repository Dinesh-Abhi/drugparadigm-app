const actions = {
    // get
    GET_MODELS_BEGIN: 'GET_MODELS_BEGIN',
    GET_MODELS_SUCCESS: 'GET_MODELS_SUCCESS',
    GET_MODELS_ERR: 'GET_MODELS_ERR',

    //create models
    CREATE_MODELS_BEGIN: 'CREATE_MODELS_BEGIN',
    CREATE_MODELS_SUCCESS: 'CREATE_MODELS_SUCCESS',
    CREATE_MODELS_ERR: 'CREATE_MODELS_ERR',

    //update models
    UPDATE_MODELS_BEGIN: 'UPDATE_MODELS_BEGIN',
    UPDATE_MODELS_SUCCESS: 'UPDATE_MODELS_SUCCESS',
    UPDATE_MODELS_ERR: 'UPDATE_MODELS_ERR',

    //get modalities models
    GET_MODALITIES_MODELS_BEGIN: 'GET_MODALITIES_MODELS_BEGIN',
    GET_MODALITIES_MODELS_SUCCESS: 'GET_MODALITIES_MODELS_SUCCESS',
    GET_MODALITIES_MODELS_ERR: 'GET_MODALITIES_MODELS_ERR',

    //get-single-model-details
    GET_SINGLE_MODEL_BEGIN: 'GET_SINGLE_MODEL_BEGIN',
    GET_SINGLE_MODEL_SUCCESS: 'GET_SINGLE_MODEL_SUCCESS',
    GET_SINGLE_MODEL_ERR: 'GET_SINGLE_MODEL_ERR',

    // post
    POST_MODELTRYOUT: 'POST_MODELTRYOUT',
    POST_MODELTRYOUT_SUCCESS: 'POST_MODELTRYOUT_SUCCESS',
    POST_MODELTRYOUT_ERR: 'POST_MODELTRYOUT_ERR',

    // get model details
    getModelDetailsBegin: () => {
        return {
            type: actions.GET_MODELS_BEGIN,
        };
    },
    getModelDetailsSuccess: (data) => {
        return {
            type: actions.GET_MODELS_SUCCESS,
            data,
        };
    },
    getModelDetailsErr: (err) => {
        return {
            type: actions.GET_MODELS_ERR,
            err,
        };
    },

    // get modalities models
    getModalitiesModelsBegin: () => {
        return {
            type: actions.GET_MODALITIES_MODELS_BEGIN,
        };
    },
    getModalitiesModelsSuccess: (data) => {
        return {
            type: actions.GET_MODALITIES_MODELS_SUCCESS,
            data,
        };
    },
    getModalitiesModelsErr: (err) => {
        return {
            type: actions.GET_MODALITIES_MODELS_ERR,
            err,
        };
    },


    // create models
    createModelBegin: () => {
        return {
            type: actions.CREATE_MODELS_BEGIN,
        };
    },
    createModelSuccess: (data) => {
        return {
            type: actions.CREATE_MODELS_SUCCESS,
            data,
        };
    },
    createModelErr: (err) => {
        return {
            type: actions.CREATE_MODELS_ERR,
            err,
        };
    },

    // update models
    updateModelBegin: () => {
        return {
            type: actions.UPDATE_MODELS_BEGIN,
        };
    },
    updateModelSuccess: (data) => {
        return {
            type: actions.UPDATE_MODELS_SUCCESS,
            data,
        };
    },
    updateModelErr: (err) => {
        return {
            type: actions.UPDATE_MODELS_ERR,
            err,
        };
    },

    // get single model details
    getSingleModelBegin: () => {
        return {
            type: actions.GET_SINGLE_MODEL_BEGIN,
        };
    },
    getSingleModelSuccess: (data) => {
        return {
            type: actions.GET_SINGLE_MODEL_SUCCESS,
            data,
        };
    },
    getSingleModelErr: (err) => {
        return {
            type: actions.GET_SINGLE_MODEL_ERR,
            err,
        };
    },


    // post model tryout
    postModelTryoutBegin: () => {
        return {
            type: actions.POST_MODELTRYOUT,
        };
    },
    postModelTryoutSuccess: (data) => {
        return {
            type: actions.POST_MODELTRYOUT_SUCCESS,
            data,
        };
    },
    postModelTryoutErr: (err) => {
        return {
            type: actions.POST_MODELTRYOUT_ERR,
            err,
        };
    },

}

export default actions;