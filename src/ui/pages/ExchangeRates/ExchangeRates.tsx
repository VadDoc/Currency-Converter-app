import styles from './ExchangeRates.module.scss'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../store/store";
import {CurrencyExchangeRatesType} from "../../../store/converterReducer";
import React from "react";

export const ExchangeRates = React.memo(() => {
  const currencyExchangeRates = useSelector<AppStoreType, CurrencyExchangeRatesType>(state => state.converterReducer.data)
  const baseCurrency = useSelector<AppStoreType, string>(state => state.converterReducer.query.base_currency)

  const exchangeRatesList = Object.keys(currencyExchangeRates).map(c => {
    return <div key={c}>1 {baseCurrency} = {currencyExchangeRates[c]} {c}</div>
  })

  return (
    <div className={styles.exchangeRates}>
      <h1>Current exchange rate</h1>
      <h2>Base currency - {baseCurrency}</h2>
      <div className={styles.exchangeRatesListWrapper}>
        {exchangeRatesList}
      </div>
    </div>
  )
})