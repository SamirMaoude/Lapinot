import 'react-native-gesture-handler';
import React from 'react'
import Splash from './components/Splash';
import Navigation from './Navigation/Navigation';
import HomeNavigator from './Navigation/DrawerNavigator';
import { authentication } from './firebase/firebase-config';
import { Provider } from 'react-redux';
import Store from './Store/configureStore'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';


import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


class App extends React.Component {
  render() {
    
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
    );
  }
}



export default App
