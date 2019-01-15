# React Map project

## About This Project

This project uses React and the Yelp API to search for Vets in El Paso, Texas, and display those results in a Google Map.

The results are shown in a list on the left side of the page along with markers on the Google Map. Clicking on a map marker or one of the Vet names in the list will open a popup in the Google Map showing more information about that Vet.

A filter input lets you filter the results both in the list and the map.

Note that since this project was created using Create-React-App it includes a ServiceWorker that is de-activated by default.

## Usage

To use this project:
* clone or download the repository
* update `src/env.js` with a Google Maps API key and Yelp API key.
* run `npm install` in the directory where you cloned the repository to install dependencies.
* run `npm start` in the directory where you cloned the repository to start the development server.

## To create a Production build (with ServiceWorker active)

* follow the first 3 steps in the Usage section above
* run `npm run build`
* make sure the `NODE_ENV` environment variable is set to `production`

## References

[Using Google Maps in a React Component](https://stackoverflow.com/questions/48493960/using-google-map-in-react-component)

[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)

[Yelp Business Search](https://www.yelp.com/developers/documentation/v3/business_search)

[CORs Anywhere](https://cors-anywhere.herokuapp.com/)
