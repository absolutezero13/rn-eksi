import React from 'react';
import './theme/UIConfig';
import {RootNavigation} from './navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <RootNavigation />
    </NavigationContainer>
  );
};
export default App;
