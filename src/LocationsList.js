import React, { Component } from 'react';

class LocationsList extends Component {

  render() {
    const { selectedLocation, selectLocation, locations, updateFilter, filter, hidden, locationsLoading } = this.props;

    return (
      <section id="locations-list" className={hidden ? 'hidden' : null}>
        <div className="filter-locations">
          <input
            type="text"
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
                    onClick={() => selectLocation(location)}
                    className={selectedLocation && selectedLocation.id === location.id ? 'selected' : null}>
                  {location.name}
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
