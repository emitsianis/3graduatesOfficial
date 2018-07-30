//import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      if (action.lol) {
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          users: state.users.concat(action.payload.name)
        };
      } else {
        return {
          ...state,
          isAuthenticated: false,
          user: {},
          users: state.users.filter(user => user !== action.payload.name)
        };
      }

    default:
      return state;
  }
}
