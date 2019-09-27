/* eslint-disable indent */
// Initial State
const initialState = {
  loggedIn: false,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Logged In
    case 'SIGNIN': {
      return {
        // State
        ...state,
        // Redux Store
        loggedIn: action.payload.state,
      };
    }
    case 'SIGNOUT': {
      return {
        // State
        ...state,
        // Redux Store
        loggedIn: action.payload.state,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
