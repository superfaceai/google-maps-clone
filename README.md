# Google Maps clone with React, Leaflet, and OneSDK

A complementary code to the tutorial [Let's build a Google Maps clone](https://superface.ai/blog/google-maps-clone).

Provides the following features:

- Displaying a map
- Adding markers to the map using location search
- Display route and routing instructions between two places

Uses the following libraries:

- [React](https://react.dev/) with [Create React App](https://github.com/facebook/create-react-app)
- [Leaflet](https://leafletjs.com/)
  - [React Leaflet](https://react-leaflet.js.org/)
  - [Leaflet Routing Machine](https://github.com/perliedman/leaflet-routing-machine)
  - [leaflet-defaulticon-compatibility](https://github.com/ghybs/leaflet-defaulticon-compatibility) to fix icons bundling in Create React App
- [Express](https://expressjs.com/) for backend
- [OneSDK](https://github.com/superfaceai/one-sdk-js) with [Geocoding use case](https://superface.ai/address/geocoding)


Uses the following providers:

- [OpenStreetMap](https://www.openstreetmap.org/) map tiles
- [Nominatim](https://nominatim.org/) for geocoding (via OneSDK)
- [OSRM](http://project-osrm.org/) for routing (via Leaflet Routing Machine)

> **Warning**
> The choice of providers is for low volume, development purposes only. Leaflet Routing Machine [recommends different routing provider](https://www.liedman.net/leaflet-routing-machine/tutorials/alternative-routers/) for production. For geocoding, [various other providers are supported](https://superface.ai/address/geocoding).

## Setup

1. Clone the repository

   ```shell
   git clone https://github.com/superfaceai/google-maps-clone.git
   ```

2. Install dependencies for both the frontend and backend

   ```shell
   cd google-maps-clone
   npm install
   cd server
   npm install
   cd ..
   ```

## Usage

Start frontend application:

```shell
npm start
```

In separate terminal, start the backend server:

```shell
cd server
npm start
```
