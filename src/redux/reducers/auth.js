import { ACTION_STRING } from "../actions/actionString";
// import { ActionType } from "redux-promise-middleware";

const initialState = {
  userData: {
    token: JSON.parse(localStorage["vehicle-rental-token"] || null),
    photo: '',
    role: 0,
    id: 0,
  },

  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};
const authReducer = (prevState = initialState, action) => {
  // const {Pending, Fulfilled, Rejected} = ActionType
  const { authLogin, authUserPhoto, pending, fulfilled, rejected } = ACTION_STRING;
  switch (action.type) {
    // case authLogin.concat("_", Pending):
    case authLogin + pending:
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    // case authLogin.concat("_", Fulfilled):
    case authLogin + fulfilled:
      const data = action.payload.data;
      const userData = {
        ...prevState.userData,
        token: data.result.token,
        photo: data.result.image,
        role: data.result.roles,
        id: data.result.id,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };

    // case authLogin.concat("_", Rejected):
    case authLogin + rejected:
      const err = action.payload;
      console.log('rejected redux')
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

      case authUserPhoto: 
      const newPhoto = action.payload;
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          photo: newPhoto,
        }
      }

    default:
      return prevState;
  }
};

export default authReducer;
