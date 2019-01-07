import React, { Component } from 'react';

class LocationsList extends Component {
  state = {
    filter: ''
  }

  updateFilter = filter => {
    this.setState({
      filter: filter
    }, this.updateLocations)
  }

  render() {
    const { selectedLocation, selectLocation, locations } = this.props;
    const { filter } = this.state;

    return (
      <div id="locations-list">
        <div className="filter-locations">
          <input type="text" placeholder="Filter" value={filter} onChange={event => this.updateFilter(event.target.value)}/>
        </div>
        <div className="locations-results">
          <ul>
            {locations.filter(location => !filter || !filter.length || location.name.toLowerCase().includes(filter.toLowerCase())
            ).map(location => {
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
