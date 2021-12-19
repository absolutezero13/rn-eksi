import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import Entry from '../../components/Entry/Entry';
import Hr from '../../components/Hr/Hr';
import Loading from '../../components/Loading/Loading';
import PageBoxes from '../../components/PageBoxes/PageBoxes';
import {IEntry} from '../../services/interfaces';
import {getTopicEntries} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {shadows} from '../../theme/shadows';

type RouteProps = {
  params: {
    slug: string;
    title: string;
    isSearch: boolean;
  };
};
const Entries = () => {
  const flatListRef = React.useRef<FlatList<IEntry>>(null);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const route = useRoute<RouteProp<RouteProps, 'params'>>();
  const {slug, isSearch} = route.params;
  console.log(entries[0]);
  useEffect(() => {
    flatListRef.current?.scrollToOffset({animated: false, offset: 0});
    setEntries([]);
    getTopicEntries(slug, currentPage, isSearch)
      .then(res => {
        setTotalPages(res.total_page);
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
  }, [currentPage]);

  const RenderEntry = ({item}: {item: IEntry}) => <Entry entry={item} />;

  return (
    <View backgroundColor={UIColors.darkMode} flex-1>
      {entries.length ? (
        <FlatList
          ref={flatListRef}
          data={entries}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 75}}
          renderItem={RenderEntry}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Hr />}
        />
      ) : (
        <Loading />
      )}
      {entries.length ? (
        <View paddingB-24 centerH centerV>
          <PageBoxes
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Entries;
