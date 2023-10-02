import { nanoid } from 'nanoid';
import { Forecast } from '../interface';
import Degree from './Degree';
import Sunrise from './Icons/Sunrise';
import Sunset from './Icons/Sunset';
import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../utils';
import Tile from './Tile';

interface ForecastProps {
  forecast: Forecast;
  onReset: () => void;
}

const ForecastComponent = ({ forecast, onReset }: ForecastProps) => {
  const todayWeather = forecast.list[0];
  return (
    <section className="w-[90vw] md:w-[60vw] md:max-w-[45rem] max-h-[70rem] py-4 md:py-4 md:px-10 lg:px-24 lg:h-auto relative bg-white bg-opacity-20 backdrop blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <div className="text-center">
          <h2 className="text-2xl font-black">
            {forecast.city.name}
            <span className="font-light">, {forecast.city.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(todayWeather.main.temp)} />
          </h1>
          <p className="text-sm">
            {todayWeather.weather[0].main} {todayWeather.weather[0].description}
          </p>
          <p className="text-sm">
            Max:
            <Degree temp={Math.ceil(todayWeather.main.temp_max)} /> Min:
            <Degree temp={Math.floor(todayWeather.main.temp_min)} />
          </p>
        </div>
        <div className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {forecast.list.map((item, index) => {
            return (
              <div
                className="inline-block text-center w-[50px] flex-shrink-0"
                key={nanoid()}
              >
                <p className="text-sm">
                  {index === 0
                    ? 'Now'
                    : `${new Date(item.dt * 1000).getHours()}:00`}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={`weather-icon-${item.weather[0].description}`}
                />
              </div>
            );
          })}
        </div>
        <section className="flex flex-wrap justify-between text-zinc-700 px-1">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunrise />
            <span className="mt-2">{getSunTime(forecast.city.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunset />{' '}
            <span className="mt-2">{getSunTime(forecast.city.sunset)}</span>
          </div>

          {/* wind */}
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(todayWeather.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(todayWeather.wind.deg)
            )}, gusts ${todayWeather.wind.gust.toFixed(1)} km/h`}
          />

          {/* feels like */}
          <Tile
            icon="feels"
            title="Feels Like"
            info={<Degree temp={Math.round(todayWeather.main.feels_like)} />}
            description={`Feels ${
              Math.round(todayWeather.main.feels_like) <
              Math.round(todayWeather.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />

          {/* Humidity */}
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${todayWeather.main.humidity}%`}
            description={getHumidityValue(todayWeather.main.humidity)}
          />

          {/* Pop */}
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(todayWeather.pop * 1000)}%`}
            description={`${getPop(todayWeather.pop)}, clouds at ${
              todayWeather.clouds.all
            }%`}
          />

          {/* Pressure */}
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${todayWeather.main.pressure} hPa`}
            description={`${
              Math.round(todayWeather.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />

          {/* Visibility */}
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(todayWeather.visibility / 1000).toFixed()} km`}
            description={`${getVisibilityValue(todayWeather.visibility)}`}
          />

          <div className="my-3 w-52 mx-auto">
            <button
              type="button"
              onClick={onReset}
              className="w-full bg-cyan-400 text-gray-200 rounded-md px-3 py-2 text-l hover:bg-cyan-600"
            >
              Search for another city
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};
export default ForecastComponent;
