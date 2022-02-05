import {getCurrencyResponseType} from "../api/api";

const initialState: ConverterInitialStateType = {
  query: {
    base_currency: ""
  },
  data: {},
  inputChangeFromValue: '',
  inputChangeToValue: '',
  selectCurrencyFromValue: '',
  selectCurrencyToValue: '',
}

export const converterReducer = (state = initialState, action: ConverterActionsType): ConverterInitialStateType => {
  switch (action.type) {
    case "CONVERTER/GET_CURRENCY_API":
      return {
        ...state,
        query: action.data.query,
        data: action.data.data,
        selectCurrencyFromValue: action.data.query.base_currency
      }
    case "CONVERTER/SET_INPUT_CHANGE_FROM":
      return {...state, inputChangeFromValue: action.value}
    case "CONVERTER/SET_INPUT_CHANGE_TO":
      return {...state, inputChangeToValue: action.value}
    case "CONVERTER/SET_SELECT_CURRENCY_FROM":
      return {...state, selectCurrencyFromValue: action.value}
    case "CONVERTER/SET_SELECT_CURRENCY_TO":
      return {...state, selectCurrencyToValue: action.value}
    default:
      return state;
  }
}

export const getCurrency = (data: getCurrencyResponseType) =>
  ({type: 'CONVERTER/GET_CURRENCY_API', data} as const)
export const setInputChangeFromValue = (value: string) =>
  ({type: 'CONVERTER/SET_INPUT_CHANGE_FROM', value} as const)
export const setInputChangeToValue = (value: string) =>
  ({type: 'CONVERTER/SET_INPUT_CHANGE_TO', value} as const)
export const setSelectCurrencyFromValue = (value: string) =>
  ({type: 'CONVERTER/SET_SELECT_CURRENCY_FROM', value} as const)
export const setSelectCurrencyToValue = (value: string) =>
  ({type: 'CONVERTER/SET_SELECT_CURRENCY_TO', value} as const)

export type ConverterInitialStateType = {
  query: QueryParamsType
  data: CurrencyExchangeRatesType
  inputChangeFromValue: string
  inputChangeToValue: string
  selectCurrencyFromValue: string
  selectCurrencyToValue: string
}
export type CurrencyExchangeRatesType = { [key: string]: number }
export type QueryParamsType = { base_currency: string }
export type ConverterActionsType = ReturnType<typeof getCurrency>
  | ReturnType<typeof setInputChangeFromValue>
  | ReturnType<typeof setInputChangeToValue>
  | ReturnType<typeof setSelectCurrencyFromValue>
  | ReturnType<typeof setSelectCurrencyToValue>
