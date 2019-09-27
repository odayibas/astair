// Imports: Dependencies
import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from '../Reducers/index';

// Middleware: Redux Thunk (Async/Await)
const middleware = [thunk];

// Middleware: Redux Logger (For Development)
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
  blacklist: ['scheduleReducer'],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {store, persistor};
