import { applyMiddleware, createStore } from "redux";
// import { createLogger } from "redux-logger";
import logger from "redux-logger";
import rpm from "redux-promise-middleware";

import reducers from "./reducers";

// const logger = createLogger()
const enhancers = applyMiddleware(rpm, logger);
const store = createStore(reducers, enhancers);

export default store;
