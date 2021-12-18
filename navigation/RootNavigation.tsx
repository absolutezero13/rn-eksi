import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Entries from '../pages/Entries/Entries';
import UserPage from '../pages/UserPage/UserPage';
import {HeaderWithBackTitle} from './headers';
import DebeEntry from '../pages/DebeEntry/DebeEntry';
const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Entries"
        component={Entries}
        options={({route}) => HeaderWithBackTitle({title: route.params?.title})}
      />
      <Stack.Screen
        name="UserPage"
        component={UserPage}
        options={({route}) =>
          HeaderWithBackTitle({
            title:
              route.params?.nick.length > 40
                ? route.params?.nick.substring(0, 30) + '...'
                : route.params?.nick,
          })
        }
      />
      <Stack.Screen
        name="DebeEntry"
        component={DebeEntry}
        options={({route}) =>
          HeaderWithBackTitle({
            title: route.params?.debe.title,
          })
        }
      />
    </Stack.Navigator>
  );
};
