import { applyMiddleware, createStore } from "redux";
import createRootReducer from "./reducers";
import { createHashHistory } from 'history';
import { routerMiddleware } from "connected-react-router";

export const history = createHashHistory();

const store = createStore(createRootReducer(history), applyMiddleware(routerMiddleware(history)));

export default store;