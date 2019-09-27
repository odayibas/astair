/* eslint-disable indent */
// Initial State
const initialState = {
  SelectedDate: '',
  SelectedStartingTime: '',
  SeletedRoom: '',
  SelectedEndingTime: '',
  SelectedPeople: [''],
};

// Reducers (Modifies The State And Returns A New State)
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    // Logged In
    case 'DATE': {
      return {
        // State
        ...state,
        // Redux Store

        SelectedDate: action.payload.payload,
      };
    }
    case 'StartTime': {
      return {
        // State
        ...state,
        // Redux Store
        SelectedStartingTime: action.payload,
      };
    }
    case 'Room': {
      return {
        // State
        ...state,
        // Redux Store
        SeletedRoom: action.payload,
      };
    }
    case 'EndTime': {
      return {
        // State
        ...state,
        // Redux Store
        SelectedEndingTime: action.payload,
      };
    }
    case 'People': {
      return {
        // State
        ...state,
        // Redux Store
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default scheduleReducer;
