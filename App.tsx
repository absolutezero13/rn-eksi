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
import {ContextProvider} from './pages/context/context';

export const navRef = createNavigationContainerRef();

const App = () => {
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navRef}>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </ContextProvider>
  );
};
export default App;
