import { combineReducers } from "redux"

import {
  fileDeleteReducer,
  FileGetReducer,
  filesCreateReducer,
} from "./fileReducers"

const reducer = combineReducers({
  fileDelete: fileDeleteReducer,
  fileGet: FileGetReducer,
  fileCreate: filesCreateReducer,
})

export default reducer
