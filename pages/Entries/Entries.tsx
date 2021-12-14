import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native-ui-lib';
import Entry from '../../components/Entry/Entry';
import Hr from '../../components/Hr/Hr';
import Loading from '../../components/Loading/Loading';
import {IEntry} from '../../services/interfaces';
import {getTopicEntries} from '../../services/services';
import {UIColors} from '../../theme/colors';

type RouteProps = {
  params: {
    slug: string;
    title: string;
  };
};
const Entries = () => {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const route = useRoute<RouteProp<RouteProps, 'params'>>();
  const slug = route.params.slug;

  useEffect(() => {
    getTopicEntries(slug)
      .then(res => {
        console.log(res.entries);
        setEntries(
          res.entries.map(entry => {
            return {
              ...entry,

              body: `<p>${entry.body}</p>`,
            };
          }),
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log({entries});
  return (
    <View backgroundColor={UIColors.darkMode} flex-1>
      <SafeAreaView edges={['bottom']} />
      {entries.length ? (
        <FlatList
          data={entries}
          contentContainerStyle={{paddingHorizontal: 18}}
          renderItem={({item}) => <Entry entry={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Hr />}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Entries;
