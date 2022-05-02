import React from 'react';
import './src/theme/UIConfig';
import 'react-native-gesture-handler';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ContextProvider} from './src/pages/context/context';
import {RootNavigation} from './src/navigation/RootNavigation';

export const navRef = createNavigationContainerRef();

function App() {
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navRef}>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </ContextProvider>
  );
}
export default App;
