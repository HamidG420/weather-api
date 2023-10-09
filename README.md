## Project in Action:

[Weather Forecast](https://weather-forecast-ts.netlify.app)

## Introduction

This weather forecast app has a search field that listens to the user's input and makes an API call to get a suggestion of the top 5 locations the user might be looking for. Once the user submits the search, the app will make another API call and get the user the weather data. The app use OpenWeather API for getting location and forecast data.

## Tools & Technologies

For the development of this project, these tools/technologies/libraries are used:

- React.js
- TypeScript
- Tailwind CSS

## Installation & Run The App Locally

To install all dependencies you should run the `npm install` command in your terminal.

To run and view this app, you should run the `npm run` command in your terminal.

You can use the command down below to perform both commands at the same time.

```sh
npm run install && npm start
```

Then visit http://localhost:3000 to interact with the app.

## Notes

In the case of styling, everything is styled with Tailwind CSS.

This is just a demo project for educational purposes and is inspired by this [youtube tutorial video](https://youtu.be/6MKFKwwhbNo?si=RnLjMtENyMgDNP4K). You can visit the Github repository of the original project in [here](https://github.com/danascript/the-ultimate-api-challenge-weather-api-typescript).However, This implementation has some differences from the original project. For example, This implementation uses the useReducer hook instead of the useState hook. It has got Debouncing functionality which is implemented with useEffect hook. It has got loading spinner which the original project didn't have. Also, the design has subtle differences.
