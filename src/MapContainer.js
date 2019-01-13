import React, { Component } from 'react';
import LocationsList from './LocationsList';
import env from './env';

class MapContainer extends Component {
  state = {
    selectedLocation: null,
    locations: [],
    filter: ''
  }

  initGoogleMaps() {
    if (!this.mapsPromise) {
      this.mapsPromise = new Promise((resolve) => {
        window.resolveGoogleMaps = () => {
          resolve(window.google);

          delete window.resolveGoogleMaps;
        };

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${env.mapsApiKey}&callback=resolveGoogleMaps`;
        script.async = true;
        document.body.appendChild(script);
      })
    }
    return this.mapsPromise;
  }

  componentWillMount() {
    this.initGoogleMaps();
  }

  componentDidMount() {
    this.initGoogleMaps().then((google) => {
      this.map = new google.maps.Map(document.getElementById('map'), {zoom: 11});
      this.infoWindow = new google.maps.InfoWindow();
      this.infoWindow.addListener('closeclick', () => {
        this.selectLocation(null);
      });
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
    fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=vet&location=el paso, tx', {
      headers: {
        'Authorization': `Bearer ${env.yelpKey}`
      }
    })
    .then(res => {
      return res.json();
    })
    .then(jsonResults => {
      const results = jsonResults.businesses;
      this.setState({locations: results});
      this.markers = [];
      for(let i = 0; i < results.length; i++) {
        const vet = results[i];
        setTimeout(() => {
          const marker = new window.google.maps.Marker({
            position: {
              lat: vet.coordinates.latitude,
              lng: vet.coordinates.longitude
            },
            map: this.map,
            title: vet.name,
            vetId: vet.id,
            animation: window.google.maps.Animation.DROP
          });
          marker.addListener('click', () => {
            this.selectLocation(vet);
          });
          this.markers.push(marker);
        }, i * 200);
      }
    })
    .catch(err => {
      console.log(`error getting locations from yelp: ${err}`);
    })
  }

  selectLocation = location => {
    const { selectedLocation } = this.state;
    if (!location) {
      this.infoWindow.close();
      this.setState({selectedLocation: null})
    } else if (selectedLocation && selectedLocation.id === location.id) {
      this.setState({selectedLocation: null})
      this.infoWindow.close();
    } else {
      this.setState({selectedLocation: location});
      const marker = this.markers.find(marker => {
        return marker.vetId === location.id;
      });

      const photoUrl = location.image_url || null;
      const photoTag = photoUrl ? `\n<br/>\n<img src="${photoUrl}"/>` : '';

      this.infoWindow.setContent(`${location.name}\n<br/>\n${location.display_phone}\n<br/>\n${location.location.display_address.join('<br/>')}\n${photoTag}`);
      this.infoWindow.open(this.map, marker);
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(((marker) => {
        marker.setAnimation(null);
      })(marker), 500);
    }
  }

  updateFilter = filter => {
    this.setState({
      filter: filter
    }, this.updateMarkers)
  }

  updateMarkers() {
    const { filter, selectedLocation } = this.state;
    this.markers.forEach(marker => {
      if (filter && filter.length && !marker.title.toLowerCase().includes(filter.toLowerCase())) {
        if (selectedLocation && selectedLocation.id === marker.vetId) {
          this.selectLocation(null);
        }
        marker.setMap(null);
      } else if (marker.map === null) {
        marker.setMap(this.map);
      }
    })
  }

  render() {
    const { locations, selectedLocation, filter } = this.state;
    return (
      <div id="map-container">
        <div id="header">
          Vets in El Paso, Tx
        </div>
        <LocationsList
        filter={filter}
        locations={locations.filter(location => !filter || !filter.length ||
        location.name.toLowerCase().includes(filter.toLowerCase()))}
        selectedLocation={selectedLocation}
        selectLocation={this.selectLocation}
        updateFilter={this.updateFilter} />
        <div id="map">...Loading...</div>
      </div>
    )
  }
}

export default MapContainer;
