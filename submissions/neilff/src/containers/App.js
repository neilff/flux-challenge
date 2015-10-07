import React, { Component, PropTypes } from 'react';

import PlanetIndicator from '../components/PlanetIndicator';
import SithLordsList from '../components/SithLordsList';

class App extends Component {
  static propTypes = {
    currentPlanet: PropTypes.string.isRequired,
  };

  render() {
    const {
      currentPlanet,
    } = this.props;

    return (
      <div className="app-container">
        <div className="css-root">
          <PlanetIndicator />
          <SithLordsList />
        </div>
      </div>
    );
  }
}

export default App;
