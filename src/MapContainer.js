import React, { Component } from 'react';
import LocationsList from './LocationsList';

class MapContainer extends Component {
  state = {
    selectedLocation: null,
    locations: []
  }

  initGoogleMaps() {
    if (!this.mapsPromise) {
      this.mapsPromise = new Promise((resolve) => {
        window.resolveGoogleMaps = () => {
          resolve(window.google);

          delete window.resolveGoogleMaps;
        };

        const script = document.createElement("script");
        const apiKey = 'AIzaSyBihJVaCxpU8TqNPiGRomIxS8pH6QEtLa0';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=resolveGoogleMaps&libraries=places`;
        script.async = true;
        document.body.appendChild(script);
      })
    }
    return this.mapsPromise;
  };

  componentWillMount() {
    this.initGoogleMaps();
  }

  componentDidMount() {
    this.initGoogleMaps().then((google) => {
      console.log('google', google);
      this.map = new google.maps.Map(document.getElementById('map'), {zoom: 11});
      this.geocoder = new google.maps.Geocoder();
      this.geocoder.geocode({address: 'El Paso, TX'}, (results, status) => {
        if (status === 'OK') {
          this.map.setCenter(results[0].geometry.location);
          this.populateVets();
        } else {
          alert('could not geocode El Paso: '+status);
        }
      })
    })
  }

  populateVets() {
    this.placesService = new window.google.maps.places.PlacesService(this.map);
    this.placesService.textSearch({query: 'vet in El Paso, TX'}, (results, status) => {
      this.setState({locations:results});
    })
  }

  selectLocation(location) {
    this.setState({selectedLocation: location})
  }

  render() {
    const { locations, selectedLocation } = this.state;
    return (
      <div id="map-container">
        <div id="header">
          Vets in El Paso, Tx
        </div>
        <LocationsList locations={locations} selectedLocation={selectedLocation} selectLocation={location => this.selectLocation(location)}/>
        <div id="map">...Loading...</div>
      </div>
    )
  }
}

export default MapContainer;
