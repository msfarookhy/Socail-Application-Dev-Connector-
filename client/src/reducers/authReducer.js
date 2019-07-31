import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER } from "../actions/types";
const initialState = {
  isAunthenticate: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAunthenticate: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
