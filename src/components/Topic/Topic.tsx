import React from 'react';
import {Text} from 'react-native-ui-lib';
import {Topic} from '../../services/interfaces';
import PressableOpacity from '../PressableOpacityComponent/PressableOpacity';
import {styles} from './Topic.style';

const TopicComponent = ({item, onPress}: {item: Topic; onPress: any}) => (
  <PressableOpacity onPress={onPress} style={[styles.topic]}>
    <>
      <Text regularText textColor maxWidth80>
        {item.title}
      </Text>
      <Text regularText darkerTextColor>
        {item.entry_count}{' '}
      </Text>
    </>
  </PressableOpacity>
);

export default TopicComponent;
