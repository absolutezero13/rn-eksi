import React from 'react';
import './theme/UIConfig';
import 'react-native-gesture-handler';
import {RootNavigation} from './navigation/RootNavigation';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const navRef = createNavigationContainerRef();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navRef}>
        <StatusBar />
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
