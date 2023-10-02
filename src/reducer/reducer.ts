import { Geo, Forecast } from '../interface';

/* 
  !NOTE:
  I purposely put interfaces related to reducer in reducer file itself. Just for the sake of better code readability.
*/

// An enum with all the types of actions to use in our reducer
export enum SearchActionsType {
  INPUT_CHANGE = 'INPUT_CHANGE',
  GET_OPTIONS = 'GET_OPTIONS',
  SELECT_CITY = 'SELECT_CITY',
  GET_FORECAST = 'GET_FORECAST',
  RESET = 'RESET',
}

// An interface for our actions in reducer
interface SearchAction {
  type: SearchActionsType;
  payload?: string | Geo | Geo[] | Forecast;
}

// An interface for our search state
interface SearchState {
  searchTerm: string; // The search term input that user type as the city he/she wants to see the forecast of it.
  searchOptions: Geo[]; // The list of cities that API offers which defined with an array of Geo interface by me!
  searchSelectedOption: Geo | null; // The city that user clicked on that to see the forecast of it, which defined with Geo type by me!
  searchCityForecast: Forecast | null; // The forecast response from API which defined with Forecast interface by me!
}

// Our initial state
export const initialSearchState: SearchState = {
  searchTerm: '',
  searchOptions: [],
  searchSelectedOption: null,
  searchCityForecast: null,
};

// Our reducer function that uses if statements to handle our actions and returns state with SearchState type
export const reducer = function (
  state: SearchState,
  action: SearchAction
): SearchState {
  const { type, payload } = action;

  if (type === SearchActionsType.INPUT_CHANGE) {
    return {
      ...initialSearchState,
      searchTerm: payload as string,
    };
  }

  if (type === SearchActionsType.GET_OPTIONS) {
    return {
      ...state,
      searchOptions: payload as Geo[],
    };
  }

  if (type === SearchActionsType.SELECT_CITY) {
    const { name } = payload as Geo;
    return {
      ...state,
      searchSelectedOption: payload as Geo,
      searchTerm: name,
      searchOptions: [],
    };
  }

  if (type === SearchActionsType.GET_FORECAST) {
    return {
      ...state,
      searchCityForecast: payload as Forecast,
    };
  }
  if (type === SearchActionsType.RESET) {
    return initialSearchState;
  }
  return state;
};
