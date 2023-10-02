export interface Geo {
  country: string;
  lat: number;
  local_names: {
    ja: string;
    ru: string;
    el: string;
    fr: string;
  };
  lon: number;
  name: string;
  state: string;
}

export interface Forecast {
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  list: {
    dt: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: [
      {
        main: string;
        icon: string;
        description: string;
      }
    ];
    wind: {
      speed: number;
      gust: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    pop: number;
    visibility: number;
  }[];
}
