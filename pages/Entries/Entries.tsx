import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native-ui-lib';
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
  };
};
const Entries = () => {
  const flatListRef = React.useRef<FlatList<IEntry>>(null);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const route = useRoute<RouteProp<RouteProps, 'params'>>();
  const slug = route.params.slug;
  const title = route.params.title;

  useEffect(() => {
    flatListRef.current?.scrollToOffset({animated: false, offset: 0});
    setEntries([]);
    getTopicEntries(slug, currentPage)
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

  console.log({entries});

  const RenderEntry = ({item}: {item: IEntry}) => <Entry entry={item} />;

  const RenderHeader = () => (
    <View style={{overflow: 'hidden', paddingBottom: 16}}>
      <View
        paddingH-18
        style={shadows.primaryShadow}
        backgroundColor={UIColors.darkMode}>
        <Text marginB-12 center h3 textColor>
          {title}{' '}
        </Text>
      </View>
    </View>
  );
  return (
    <View backgroundColor={UIColors.darkMode} flex-1>
      {entries.length ? (
        <FlatList
          ref={flatListRef}
          data={entries}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 75}}
          ListHeaderComponent={RenderHeader}
          stickyHeaderIndices={[0]}
          renderItem={RenderEntry}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <PageBoxes
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          }
          ItemSeparatorComponent={() => <Hr />}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Entries;
