import React, {useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import {Converter} from "../pages/Converter/Converter";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {LoadingLine} from "../../common/components/LoadingLine/LoadingLine";
import {ExchangeRates} from "../pages/ExchangeRates/ExchangeRates";
import {Navigation} from "../../common/components/Navigation/Navigation";
import {getCurrencyApi} from "../../store/thunks";
import {Page404} from "../pages/Page404/Page404";

function App() {
  const {loading, error} = useSelector<AppStoreType, { [key: string]: boolean | string }>((state) => state.appReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrencyApi('USD'))
  }, []);

  return (
    <div className="App">
      {loading && <LoadingLine/>}
      {error ? <div className={'error-message'}>{error}</div> :
        <>
          <Routes>
            <Route path={'404'} element={<Page404/>}/>
            <Route path={'/*'} element={<Navigate to={'404'}/>}/>
            <Route path={'/'} element={<Converter/>}/>
            <Route path={'converter'} element={<Converter/>}/>
            <Route path={'exchange-rates'} element={<ExchangeRates/>}/>
          </Routes>
          <Navigation/>
        </>}
    </div>
  );
}

export default App;
