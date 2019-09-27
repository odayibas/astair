// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import authReducer from './AuthReducer';
import scheduleReducer from './ScheduleReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  scheduleReducer: scheduleReducer,
});

// Exports
export default rootReducer;
