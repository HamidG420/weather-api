import { ChangeEvent, FormEvent } from 'react';

import { nanoid } from 'nanoid';

import { Geo } from '../interface';
import Loading from './Loading';

interface SearchFormProps {
  isLoading: boolean;
  searchTerm: string;
  searchOptions: Geo[];
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmission: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onOptionSelect: (option: Geo) => Promise<void>;
}

const SearchForm = ({
  isLoading,
  searchTerm,
  searchOptions,
  onInputChange,
  onFormSubmission,
  onOptionSelect,
}: SearchFormProps): JSX.Element => {
  return (
    <section className="w-[85vw] md:w-[90vw] md:max-w-[40rem] h-[85vh] max-h-[45rem] md:h-[90vh] flex flex-col gap-5 text-center items-center justify-center md:px-10 lg:p-12 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
      <h1 className="md:text-5xl text-3xl font-light">
        Weather <span className="font-black text-sky-900">Forecast</span>
      </h1>
      <p className="md:text-xl mx-4 md:mx-0">
        Enter below a place you want to know the weather of and select an option
        from the dropdown
      </p>
      <form
        onSubmit={onFormSubmission}
        className="flex md:mt-5 relative justify-center"
      >
        <input
          type="text"
          value={searchTerm}
          className="w-48 px-2 py-2 rounded-l-md border-2 border-white outline-sky-800 md:text-2xl md:w-72"
          onChange={onInputChange}
        />
        {isLoading ? (
          <Loading type="searchOptions" />
        ) : (
          <ul className="absolute mt-1 ml-1 top-12 md:top-14 bg-white rounded-b-md w-2/5 left-0">
            {searchOptions.map((option) => (
              <li key={nanoid()}>
                <button
                  className="text-left md:text-xl w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="rounded-r-md border-2 border-l-transparent border-zinc-100 hover:border-sky-700 hover:border-l-transparent hover:text-sky-700 text-zinc-100 px-2 py-1 cursor-pointer text-lg"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
