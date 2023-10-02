import useForecast from './useForecast';
import SearchForm from './components/SearchForm';
import Forecast from './components/Forecast';
import Loading from './components/Loading';

const App = (): JSX.Element => {
  const {
    isLoading,
    state,
    inputChangeHandler,
    optionSelectionHandler,
    formSubmissionHandler,
    resetAppHandler,
  } = useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-200 to-sky-700 min-h-screen w-full p-5 overflow-x-hidden">
      {isLoading && !state.searchCityForecast && state.searchSelectedOption ? (
        <Loading type="forecast" />
      ) : state.searchCityForecast ? (
        <Forecast
          forecast={state.searchCityForecast}
          onReset={resetAppHandler}
        />
      ) : (
        <SearchForm
          isLoading={isLoading}
          searchTerm={state.searchTerm}
          searchOptions={state.searchOptions}
          onInputChange={inputChangeHandler}
          onFormSubmission={formSubmissionHandler}
          onOptionSelect={optionSelectionHandler}
        />
      )}
    </main>
  );
};

export default App;
