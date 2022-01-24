import { combineReducers } from "redux";
import authReducer from "./auth";
import { ACTION_STRING } from "../actions/actionString";
import storage from "redux-persist/lib/storage";
// import userReducer from "./users";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

const appReducer = combineReducers({
  auth: authReducer,
  // userPhoto: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTION_STRING.authLogout) {
    storage.removeItem('persist:root');

    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
