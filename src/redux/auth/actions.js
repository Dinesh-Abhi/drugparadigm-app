const actions = {

    GET_USERINFO_BEGIN: 'GET_USERINFO_BEGIN',
    GET_USERINFO_SUCCESS: 'GET_USERINFO_SUCCESS',
    GET_USERINFO_ERR: 'GET_USERINFO_ERR',

    DELETE_USER_BEGIN: 'DELETE_USER_BEGIN',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_ERR: 'DELETE_USER_ERR',

    // getall
    getUserInfoBegin: () => {
        return {
            type: actions.GET_USERINFO_BEGIN,
        };
    },
    getUserInfoSuccess: (data) => {
        return {
            type: actions.GET_USERINFO_SUCCESS,
            data,
        };
    },
    getUserInfoErr: (err) => {
        return {
            type: actions.GET_USERINFO_ERR,
            err,
        };
    },

    // delete
    deleteUserBegin: () => {
        return {
            type: actions.DELETE_USER_BEGIN,
        };
    },
    deleteUserSuccess: (data) => {
        return {
            type: actions.DELETE_USER_SUCCESS,
            data,
        };
    },
    deleteUserErr: (err) => {
        return {
            type: actions.DELETE_USER_ERR,
            err,
        };
    },


};



export default actions;
