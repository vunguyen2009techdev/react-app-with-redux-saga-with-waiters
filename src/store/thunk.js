import * as services from "../services";
import * as actions from "./action";

export const fetchUsers = () => async (dispatch) => {
  dispatch(actions.getUsersRequested());
  try {
    const dbUser = await services.fetchUsers();
    dispatch(actions.getUsersSucceed(dbUser));
    return dbUser;
  } catch (error) {
    dispatch(actions.getUsersFailed(error));
  }
};
