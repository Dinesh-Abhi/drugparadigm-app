import { getUserId } from "supertokens-auth-react/recipe/session";
import { DataService } from "../../config/dataservice";
import actions from "./actions";
import { message } from "antd";

const {

  getUserInfoBegin,
  getUserInfoSuccess,
  getUserInfoErr,

  deleteUserBegin,
  deleteUserSuccess,
  deleteUserErr,

} = actions;

// get-drugmodalities-details
const GetUserInformation = (userId) => {
  return async (dispatch) => {
    try {
      await dispatch(getUserInfoBegin()); 
      const response = await DataService.get(`/getuserinfo/${userId}`);
      if (response.data !== null) {
        await dispatch(getUserInfoSuccess(response.data));
      } else {
        if (response.data.statusCode === null) {
          await dispatch(getUserInfoSuccess([]));
        }
      }
    } catch (err) {
      await dispatch(getUserInfoErr(err));
    }
  };
};

// delete-drugmodalities-details
const DeleteUserInformation = (userId) => {
  return async (dispatch) => {
    try {
      await dispatch(deleteUserBegin());
      const response = await DataService.delete(`/delete/${userId}`);
      if (response.data !== null) {
        await dispatch(deleteUserSuccess(response.data));
        message.success("User deleted successfully");
      } else {
        if (response.data.statusCode === null) {
          await dispatch(deleteUserSuccess([]));
        }
      }
    } catch (err) {
      await dispatch(deleteUserErr(err));
    }
  };
};

export {
  GetUserInformation,
  DeleteUserInformation,
};

