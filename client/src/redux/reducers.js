const initialState = {
  vacations: [],
  user: [],
  userID: 0,
  userRole: 0,
  logInFormStatus: true,
  userFormStatus: false,
  // vacation form
  showVacationForm: false,
  vacationFormButtonsStatus: 0,
  vacationToEdit: {},
};

function rootReducer(state = initialState, action) {
  console.log("root:", action.type, ", ", action.payload);

  switch (action.type) {
    case "updateVacations":
      state = { ...state, vacations: action.payload };
      break;
    case "updateUser":
      state = { ...state, user: action.payload };
      break;
    case "updateLogInStatus":
      state = { ...state, logInFormStatus: action.payload };
      break;
    case "updateUserFormStatus":
      state = { ...state, userFormStatus: action.payload };
      break;
    case "updateUserID":
      state = { ...state, userID: action.payload };
      break;
    case "updateUserRole":
      state = { ...state, userRole: action.payload };
      break;
    // vacation form
    case "UpdateShowVacationForm":
      state = { ...state, showVacationForm: action.payload };
      break;
    case "updateVacationButtonsForm":
      state = { ...state, vacationFormButtonsStatus: action.payload };
      break;
    case "updateVacationToForm":
      state = { ...state, vacationToEdit: action.payload };
      break;
  }
  return state;
}

export default rootReducer;
