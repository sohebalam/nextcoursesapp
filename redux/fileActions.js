import {
  FILE_CREATE_FAIL,
  FILE_CREATE_REQUEST,
  FILE_CREATE_SUCCESS,
  FILE_DELETE_FAIL,
  FILE_DELETE_REQUEST,
  FILE_DELETE_SUCCESS,
  FILE_GET_FAIL,
  FILE_GET_REQUEST,
  FILE_GET_SUCCESS,
} from "./fileTypes"
import axios from "axios"

export const deleteFileCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: FILE_DELETE_REQUEST })

    const { data } = await axios.delete(`/api/delete/${id}`)

    dispatch({
      type: FILE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFiles = () => async (dispatch) => {
  try {
    dispatch({ type: FILE_GET_REQUEST })

    const { data } = await axios.get(`/api/getFiles`)

    dispatch({
      type: FILE_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createFile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: FILE_CREATE_REQUEST })

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

    const { data } = await axios.post(`/api/upload`, formData, config)

    dispatch({
      type: FILE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
