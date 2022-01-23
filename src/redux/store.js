import { applyMiddleware, createStore } from "redux";
// import { createLogger } from "redux-logger";
import logger from "redux-logger";
import rpm from "redux-promise-middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};
const pReducer = persistReducer(persistConfig, rootReducer);
// const logger = createLogger()
const enhancers = applyMiddleware(rpm, logger);
const store = createStore(pReducer, enhancers);

const persistor = persistStore(store);

export { persistor, store };
