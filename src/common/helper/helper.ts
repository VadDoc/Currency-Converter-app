import {Dispatch} from "redux";
import {ConverterActionsType, setInputChangeFromValue, setInputChangeToValue} from "../../store/converterReducer";

export const resetInputs = (dispatch: Dispatch<ConverterActionsType>) => {
  dispatch(setInputChangeFromValue(''))
  dispatch(setInputChangeToValue(''))
}
