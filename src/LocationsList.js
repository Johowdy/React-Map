import React, { Component } from 'react';

class LocationsList extends Component {

  render() {
    const { selectedLocation, selectLocation, locations, updateFilter, filter, hidden, locationsLoading } = this.props;

    return (
      <section id="locations-list" className={hidden ? 'hidden' : null}>
        <div className="filter-locations">
          <input
            type="text"
            label="Vet Locations Filter"
            placeholder="Filter" value={filter}
            onChange={event => updateFilter(event.target.value)}/>
        </div>
        <div className="locations-results">
          {!locationsLoading &&
            <ul>
              {locations.map(location => {
                return (
                  <li
                    key={location.id}
                    className={selectedLocation && selectedLocation.id === location.id ? 'selected' : null}>
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        selectLocation(location);
                      }}
                      aria-label={`Select ${location.name}`}>
                      {location.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          }
          {locationsLoading &&
            <div id="loading-locations">Retrieving data from Yelp API...</div>
          }
        </div>
      </section>
    )
  }

}

export default LocationsList;
