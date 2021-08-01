const initialState = {
  vacations: [],
  user: [],

  // vacation form button add-0 edit-1
  addVsEditButtons: 0,

  // modal content login-1 register-2
  content: 1,
};

function rootReducer(state = initialState, action) {
  // console.log("root:", action.type, ", ", action.payload);

  switch (action.type) {
    case "updateVacations":
      state = { ...state, vacations: action.payload };
      break;

    case "updateUser":
      state = { ...state, user: action.payload };
      break;

    // vacation form
    case "updateAddVsEditButtons":
      state = { ...state, addVsEditButtons: action.payload };
      break;

    // modal
    case "updateContent":
      state = { ...state, content: action.payload };
      break;
  }
  return state;
}

export default rootReducer;
