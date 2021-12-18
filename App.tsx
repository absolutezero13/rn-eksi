import React from 'react';
import './theme/UIConfig';
import {RootNavigation} from './navigation/RootNavigation';
import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {StatusBar} from 'react-native';

export const navRef = createNavigationContainerRef();

const App = () => {
  return (
    <NavigationContainer ref={navRef}>
      <StatusBar barStyle="light-content" />
      <RootNavigation />
    </NavigationContainer>
  );
};
export default App;
