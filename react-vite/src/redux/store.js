import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import pinsReducer from "./pins"
import boardReducer from "./board";
import commentsReducer from "./comment";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  session: sessionReducer,
  pinState: pinsReducer,
  boardState: boardReducer,
  commentState: commentsReducer,
  favoriteState: favoritesReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
