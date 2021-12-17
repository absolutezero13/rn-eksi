import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native-ui-lib';
import {Topic} from '../../services/interfaces';

const TopicComponent = ({item, onPress}: {item: Topic; onPress: any}) => (
  <TouchableOpacity onPress={onPress} style={[styles.topic]}>
    <>
      <Text regularText textColor maxWidth80>
        {item.title}
      </Text>
      <Text regularText darkerTextColor>
        {item.entry_count}{' '}
      </Text>
    </>
  </TouchableOpacity>
);

export default TopicComponent;
