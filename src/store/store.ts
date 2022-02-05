import {applyMiddleware, combineReducers, createStore} from "redux";
import {converterReducer} from "./converterReducer";
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
  converterReducer,
  appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStoreType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;