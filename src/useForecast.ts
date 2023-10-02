import {
  useEffect,
  useReducer,
  FormEvent,
  ChangeEvent,
  useState,
  useCallback,
} from 'react';
import { reducer, SearchActionsType, initialSearchState } from './reducer';
import { customFetch } from './utils';
import { Geo, Forecast } from './interface';
import { AxiosResponse } from 'axios';

/* 
  *NOTE:
  This custom hook controls all dispatch related to main logic of app. 
  For state handling I use  useReducer hook instead of useState.
*/

const useForecast = () => {
  const [state, dispatch] = useReducer(reducer, initialSearchState);
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = function (event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    dispatch({ type: SearchActionsType.INPUT_CHANGE, payload: value });
  };

  const optionSelectionHandler = async function (selectedOption: Geo) {
    dispatch({
      type: SearchActionsType.SELECT_CITY,
      payload: selectedOption,
    });
    // const data: Forecast = await getForecastOfSelectedOption(selectedOption);
    // dispatch({ type: SearchActionsType.GET_FORECAST, payload: data });
  };

  const formSubmissionHandler = async function (
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    if (!state.searchSelectedOption) {
      alert('enter something!');
      return;
    }
    const data: Forecast = await getForecastOfSelectedOption(
      state.searchSelectedOption
    );

    const slicedData: Forecast = {
      city: data.city,
      list: data.list.slice(0, 16),
    };
    dispatch({ type: SearchActionsType.GET_FORECAST, payload: slicedData });
  };

  const getSearchOptions = useCallback(async function (
    term: string
  ): Promise<Geo[]> {
    setIsLoading(true);
    const response: AxiosResponse<Geo[]> = await customFetch.get(
      `/geo/1.0/direct?q=${term}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    );
    setIsLoading(false);
    return response.data;
  },
  []);

  const getForecastOfSelectedOption = async function (
    option: Geo
  ): Promise<Forecast> {
    setIsLoading(true);
    const response: AxiosResponse<Forecast> = await customFetch.get(
      `/data/2.5/forecast?lat=${option?.lat}&lon=${option?.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    setIsLoading(false);

    return response.data;
  };

  const resetAppHandler = function () {
    dispatch({ type: SearchActionsType.RESET });
  };

  useEffect(() => {
    const time = setTimeout(async () => {
      if (
        state.searchTerm &&
        state.searchOptions.length === 0 &&
        state.searchSelectedOption?.name !== state.searchTerm
      ) {
        const data = await getSearchOptions(state.searchTerm);
        dispatch({ type: SearchActionsType.GET_OPTIONS, payload: data });
      }
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [
    state.searchTerm,
    state.searchOptions,
    getSearchOptions,
    state.searchSelectedOption,
  ]);

  return {
    state,
    isLoading,
    inputChangeHandler,
    optionSelectionHandler,
    formSubmissionHandler,
    resetAppHandler,
  };
};
export default useForecast;
