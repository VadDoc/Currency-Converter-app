import React, {ChangeEvent} from "react";
import styles from './Converter.module.scss'
import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../store/store";
import {
  ConverterInitialStateType, CurrencyExchangeRatesType, setInputChangeFromValue,
  setInputChangeToValue, setSelectCurrencyFromValue, setSelectCurrencyToValue
} from "../../../store/converterReducer";
import {resetInputs} from "../../../common/helper/helper";
import {getCurrencyApi} from "../../../store/thunks";


export const Converter = React.memo(() => {
  const currencyExchangeRates = useSelector<AppStoreType, CurrencyExchangeRatesType>(state => state.converterReducer.data)
  const baseCurrency = useSelector<AppStoreType, string>(state => state.converterReducer.query.base_currency)
  const {
    inputChangeFromValue,
    inputChangeToValue,
    selectCurrencyFromValue,
    selectCurrencyToValue,
  } = useSelector<AppStoreType, ConverterInitialStateType>(state => state.converterReducer)
  const dispatch = useDispatch()

  const currenciesApi = Object.keys(currencyExchangeRates)
  const selectCurrencyFromValues = [baseCurrency, ...currenciesApi]
  const selectCurrencyToValues = ['', ...currenciesApi]
  const exchangeRateSelectedCurrencies = currencyExchangeRates[selectCurrencyToValue]

  const onChangeInputChangeFromValue = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value
    if (Number(currentValue) < 0) return
    dispatch(setInputChangeFromValue(currentValue))
    const calculatedInputChangeToValue = (Math.round(Number(Number(currentValue) * exchangeRateSelectedCurrencies) * 100) / 100)
    dispatch(setInputChangeToValue(calculatedInputChangeToValue.toString()))
  }
  const onChangeInputChangeToValue = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value
    if (Number(currentValue) < 0) return
    dispatch(setInputChangeToValue(currentValue))
    const calculatedInputChangeFromValue = (Math.round(Number(Number(currentValue) / exchangeRateSelectedCurrencies) * 100) / 100)
    dispatch(setInputChangeFromValue(calculatedInputChangeFromValue.toString()))
  }
  const onChangeSelectCurrencyFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.currentTarget.value
    dispatch(setSelectCurrencyFromValue(currentValue))
    dispatch(getCurrencyApi(currentValue))
    resetInputs(dispatch)
  }
  const onChangeSelectCurrencyTo = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.currentTarget.value
    dispatch(setSelectCurrencyToValue(currentValue))
    resetInputs(dispatch)
  }

  return (
    <div className={styles.converter}>
      <h1>Currency Converter</h1>
      <div>
        <h4>Select currency to exchange from:</h4>
        <Input
          type={'number'}
          value={inputChangeFromValue}
          onChange={onChangeInputChangeFromValue}
        />
        <Select
          options={selectCurrencyFromValues}
          value={selectCurrencyFromValue}
          onChange={onChangeSelectCurrencyFrom}
        />
      </div>

      <div>
        <h4>Select currency to exchange to:</h4>
        <Input
          type={'number'}
          value={inputChangeToValue}
          onChange={onChangeInputChangeToValue}
        />
        <Select
          options={selectCurrencyToValues}
          value={selectCurrencyToValue}
          onChange={onChangeSelectCurrencyTo}
        />
      </div>
    </div>
  )
})
