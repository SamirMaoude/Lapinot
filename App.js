import 'react-native-gesture-handler';
import React from 'react'
import Splash from './components/Splash';
import Navigation from './Navigation/Navigation';
import HomeNavigator from './Navigation/DrawerNavigator';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


class App extends React.Component {
  render() {

    return (
      <Navigation />

    );
  }
}


export default App
