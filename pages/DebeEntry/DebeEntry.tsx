import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Entry from '../../components/Entry/Entry';
import {Debe} from '../../services/interfaces';
import {UIColors} from '../../theme/colors';

type RouteProps = {
  params: {
    debe: Debe;
  };
};

const DebeEntry = () => {
  const route = useRoute<RouteProp<RouteProps, 'params'>>();

  return (
    <View flex-1 backgroundColor={UIColors.darkMode}>
      <ScrollView style={{marginTop: 24}}>
        <View paddingH-16>
          <Text marginB-12 textColor h3>
            {route.params.debe.title}{' '}
          </Text>
        </View>
        <Entry entry={route.params.debe} />
      </ScrollView>
    </View>
  );
};

export default DebeEntry;
