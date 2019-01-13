import React, { Component } from 'react';

class LocationsList extends Component {

  render() {
    const { selectedLocation, selectLocation, locations, updateFilter, filter } = this.props;

    return (
      <div id="locations-list">
        <div className="filter-locations">
          <input type="text" placeholder="Filter" value={filter} onChange={event => updateFilter(event.target.value)}/>
        </div>
        <div className="locations-results">
          <ul>
            {locations.map(location => {
              return (
                <li key={location.id} location={location} onClick={() => selectLocation(location)} className={selectedLocation && selectedLocation.id === location.id ? 'selected' : null}>
                {location.name}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

}

export default LocationsList;
