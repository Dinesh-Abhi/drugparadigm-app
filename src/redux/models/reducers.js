import actions from "./actions";

const {
    GET_MODELS_BEGIN,
    GET_MODELS_SUCCESS,
    GET_MODELS_ERR,

    GET_MODALITIES_MODELS_BEGIN,
    GET_MODALITIES_MODELS_SUCCESS,
    GET_MODALITIES_MODELS_ERR,

    POST_MODELTRYOUT,
    POST_MODELTRYOUT_SUCCESS,
    POST_MODELTRYOUT_ERR,

    CREATE_MODELS_BEGIN,
    CREATE_MODELS_SUCCESS,
    CREATE_MODELS_ERR,

    UPDATE_MODELS_BEGIN,
    UPDATE_MODELS_SUCCESS,
    UPDATE_MODELS_ERR,

    GET_SINGLE_MODEL_BEGIN,
    GET_SINGLE_MODEL_SUCCESS,
    GET_SINGLE_MODEL_ERR,

} = actions;

//----INITIAL-STATES----//

const getModelsIntialState = {
    data: [],
    loading: false,
    error: null,
};

const getModalitiesModelsIntialState = {
    data: [],
    loading: false,
    error: null,
};

const getSingleModelIntialState = {
    data: null,
    loading: false,
    error: null,
};

const postModelTryoutInitialState = {
    data: null,
    loading: false,
    error: null,
};

const createModelInitialState = {
    data: null,
    loading: false,
    error: null,
};

const updateModelInitialState = {
    data: null,
    loading: false,
    error: null,
};

//--------REDUCERS-------//

const GetAllModelsReducer = (state = getModelsIntialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case GET_MODELS_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case GET_MODELS_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case GET_MODELS_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };

        default:
            return state;
    }
};

const GetModalitiesModelsReducer = (state = getModalitiesModelsIntialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case GET_MODALITIES_MODELS_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case GET_MODALITIES_MODELS_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case GET_MODALITIES_MODELS_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };

        default:
            return state;
    }
};

const GetSingleModelReducer = (state = getSingleModelIntialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case GET_SINGLE_MODEL_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case GET_SINGLE_MODEL_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case GET_SINGLE_MODEL_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };

        default:
            return state;
    }
};

const PostModelTryoutReducer = (state = postModelTryoutInitialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case POST_MODELTRYOUT:
            return {
                ...state,
                loading: true,
            };

        case POST_MODELTRYOUT_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case POST_MODELTRYOUT_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };

        default:
            return state;
    }
};


const CreateModelsReducer = (state = createModelInitialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case CREATE_MODELS_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case CREATE_MODELS_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case CREATE_MODELS_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };

        default:
            return state;
    }
};


const UpdateModelsReducer = (state = updateModelInitialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case UPDATE_MODELS_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_MODELS_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case UPDATE_MODELS_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };

        default:
            return state;
    }
};



export {
    GetAllModelsReducer,
    GetModalitiesModelsReducer,
    GetSingleModelReducer,
    CreateModelsReducer,
    UpdateModelsReducer,
    PostModelTryoutReducer,
};
