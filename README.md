# weather-app
Basic weather app prototype made with Vue. Displays local weather information on page load based on IP information and allows user to search for weather information for other locations.

* Uses [OpenWeatherMap.org](https://openweathermap.org/) for weather information.
* Uses [OpenCage Geocoder](https://opencagedata.com/) for geocoding of search input
* Uses [GeoJS](https://www.geojs.io/) to retrieve IP information
* Uses [Unsplash Source](https://source.unsplash.com/) for random background image

⚠️ **This project is a prototype and is not meant to run in a production environment** ⚠️
If you want to run this app in a production environment you should set up a custom backend to route your API requests through in order to not publicly expose your API keys.

## Project setup
1. Clone the repository and run `npm install`
2. Register at: [openweathermap.org](https://openweathermap.org) and [opencagedata.com](https://opencagedata.com) for free API keys required to run the app.
3. Add your API keys to the `env.config.js` file.
4. Run `npm run serve` to start local development server

⚠️ Never commit your API keys and avoid storing keys you can't restrict on the client side whenever possible. The only reason this file exists is because this is a prototype without a backend.

#### Development server with hot-reloading
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Run unit tests
```
npm run test:unit
```
