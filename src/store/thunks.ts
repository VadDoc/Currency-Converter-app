import {Dispatch} from "redux";
import {setAppLoading, setError} from "./appReducer";
import {api} from "../api/api";
import axios from "axios";
import {getCurrency, setInputChangeFromValue} from "./converterReducer";

export const getCurrencyApi = (baseCurrency: string) => async (dispatch: Dispatch) => {
  dispatch(setAppLoading(true));
  try {
    const response = await api.getCurrency(baseCurrency)
    dispatch(getCurrency(response.data))
    dispatch(setInputChangeFromValue(''))
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if(error.response.status===429) {
        dispatch(setError(error.response.data.too_many_requests))
      } else {
        dispatch(setError('Sorry: we have some error. Try later'))
      }
    }
  } finally {
    dispatch(setAppLoading(false));
  }
}