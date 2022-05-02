import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import Entry from '../../components/Entry/Entry';
import Hr from '../../components/Hr/Hr';
import Loading from '../../components/Loading/Loading';
import PageBoxes from '../../components/PageBoxes/PageBoxes';
import {IEntry} from '../../services/interfaces';
import {getTopicEntries} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {Context} from '../context/context';

type RouteProps = {
  params: {
    slug: string;
    title: string;
    isSearch: boolean;
    isFavs: boolean;
  };
};
const Entries = () => {
  const flatListRef = React.useRef<FlatList<IEntry>>(null);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const {favoriteEntries} = useContext(Context);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const route = useRoute<RouteProp<RouteProps, 'params'>>();
  const {slug, isSearch, isFav} = route.params;

  useEffect(() => {
    if (isFav) {
      setEntries(favoriteEntries);
    }
  }, [favoriteEntries]);

  useEffect(() => {
    if (isFav) {
      setEntries(favoriteEntries);
    } else {
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
    }
  }, [currentPage]);

  const RenderEntry = ({item}: {item: IEntry}) => (
    <Entry isFav={isFav} title={route.params.title} entry={item} />
  );

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
      ) : isFav ? (
        <View
          centerH
          centerV
          flex-1
          marginB-24
          style={{maxWidth: '80%', alignSelf: 'center'}}>
          <Text center h3 textColor>
            yok ki öyle bi şey.
          </Text>
        </View>
      ) : (
        <Loading />
      )}
      {entries.length
        ? !isFav && (
            <View paddingB-24 centerH centerV>
              <PageBoxes
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </View>
          )
        : null}
    </View>
  );
};

export default Entries;
