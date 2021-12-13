import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text} from 'react-native-ui-lib';
import {getTopicEntries} from '../../services/services';

type RouteProps = {
  params: {
    slug: string;
    title: string;
  };
};
const Entries = () => {
  const [entries, setEntries] = useState([]);
  const route = useRoute<RouteProp<RouteProps, 'params'>>();
  const slug = route.params.slug;

  useEffect(() => {
    getTopicEntries(slug)
      .then(res => {
        setEntries(res.entries);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log({entries});
  return (
    <View>
      <Text>entriess</Text>

      <FlatList
        data={entries}
        renderItem={({item}) => <Text>{item.body}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Entries;
