import { CLEAR_ERRORS } from "../actions/types";

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
