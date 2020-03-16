import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import MainScreen from './MainScreen';
import Details from './Details';
import picker from './picker'
const App = () => {
  
  return (
    <Router>
      <Scene key="root">
      <Scene key="picker"
          component={picker}
          title="picker"
          //initial
        />
        <Scene key="mainScreen"
          component={MainScreen}
          title="mainscreen"
         initial
        />
        <Scene
          key="details"
          component={Details}
          title="details"
        />
      </Scene>
    </Router>
  );
}
export default App;
