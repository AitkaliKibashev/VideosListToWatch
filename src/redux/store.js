import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./reducers/appReducer";
import thunkMiddleware from "redux-thunk";

const reducers = combineReducers({
    mainApp: appReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
