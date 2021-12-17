import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Image} from 'react-native-ui-lib';
import Loading from '../../components/Loading/Loading';
import {Topic} from '../../services/interfaces';
import {getTopics} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {styles} from './Home.style';
import eksiLogoWhite from '../../imgs/eksi-logo-white.png';
import {shadows} from '../../theme/shadows';
import TopicComponent from '../../components/Topic/Topic';
import SearchInput from '../../components/SearchInput/SearchInput';

const Home = () => {
  const navigation = useNavigation();
  const [hotTopics, setHotTopics] = useState<Topic[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    getTopics().then(res => {
      setHotTopics(res);
    });
  }, []);

  const renderTopic = ({item}: {item: Topic}) => (
    <TopicComponent onPress={() => pressItem(item)} item={item} />
  );

  const pressItem = (item: Topic) => {
    console.log('press');
    navigation.navigate('Entries', {
      slug: item.slug,
      title: item.title,
    });
  };

  return (
    <View backgroundColor={UIColors.darkMode} flex-1>
      <SafeAreaView
        edges={['bottom']}
        style={{
          paddingTop: 12,
        }}
      />
      <View style={{overflow: 'hidden', paddingBottom: 12}}>
        <View
          row
          centerV
          spread
          paddingH-5
          paddingB-6
          backgroundColor={UIColors.darkMode}
          style={shadows.primaryShadow}>
          <Image
            source={eksiLogoWhite}
            style={styles.img}
            resizeMode="contain"
          />
          <SearchInput setValue={setSearchValue} value={searchValue} />
        </View>
      </View>

      <View flex-1 paddingH-18>
        {hotTopics.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}
            style={{flex: 1}}
            initialNumToRender={50}
            data={hotTopics}
            renderItem={renderTopic}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
};

export default Home;
