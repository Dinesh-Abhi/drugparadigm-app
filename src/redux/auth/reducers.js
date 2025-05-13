import actions from "./actions";

const {
    GET_USERINFO_BEGIN,
    GET_USERINFO_SUCCESS,
    GET_USERINFO_ERR,

    DELETE_USER_BEGIN,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERR,


} = actions;

//----INITIAL-STATES----//

const getUserInfoInitialstate = {
    data: [],
    loading: false,
    error: null,
};

const deleteUserInitialstate = {
    data: [],
    loading: false,
    error: null,
};

//--------REDUCERS-------//

const getUserInfoReducer = (state = getUserInfoInitialstate, action) => {
    const { type, data, err } = action;
    switch (type) {
        case GET_USERINFO_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case GET_USERINFO_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case GET_USERINFO_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };

        default:
            return state;
    }
};

const deleteUserReducer = (state = deleteUserInitialstate, action) => {
    const { type, data, err } = action;
    switch (type) {
        case DELETE_USER_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                data,
                error: false,
                loading: false,
            };

        case DELETE_USER_ERR:
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
    getUserInfoReducer,    
    deleteUserReducer,
}
