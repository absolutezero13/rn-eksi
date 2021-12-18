import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Image, Text} from 'react-native-ui-lib';
import Loading from '../../components/Loading/Loading';
import {Topic} from '../../services/interfaces';
import {getSearchResults, getTopics} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {styles} from './Home.style';
import eksiLogoWhite from '../../imgs/eksi-logo-white.png';
import {shadows} from '../../theme/shadows';
import TopicComponent from '../../components/Topic/Topic';
import SearchInput from '../../components/SearchInput/SearchInput';
import PressableOpacity from '../../components/PressableOpacityComponent/PressableOpacity';
import {screenWidth} from '../../utils/constants';
import {stringToSlug} from '../../utils/functions';
import slugify from 'slugify';

const Home = () => {
  const navigation = useNavigation();
  const [hotTopics, setHotTopics] = useState<Topic[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    getTopics().then(res => {
      setHotTopics(res);
    });
  }, []);

  const [autoCompleteResults, setAutoCompleteResults] = React.useState<
    string[] | []
  >([]);

  const DropDown = () => {
    return (
      <View width={screenWidth / 2} style={styles.dropDown}>
        <FlatList
          data={autoCompleteResults}
          renderItem={({item}) => (
            <PressableOpacity onPress={() => pressDropDownItem(item)}>
              <Text style={{fontSize: 14}} regularText>
                {item}{' '}
              </Text>
            </PressableOpacity>
          )}
        />
      </View>
    );
  };

  const renderTopic = ({item}: {item: Topic}) => (
    <TopicComponent onPress={() => pressItem(item)} item={item} />
  );

  const pressItem = (item: Topic) => {
    console.log('press');
    console.log('gündem slug', item.slug);
    navigation.navigate('Entries', {
      slug: item.slug,
      title: item.title,
      isSearch: false,
    });
  };

  const pressDropDownItem = (item: string) => {
    setSearchValue(item);
    console.log('slug', slugify(item));
    getSearchResults(slugify(item)).then(res => {
      console.log('SEARCH RESULTS', res);
      try {
        const thread: any = res.threads.find(thread => {
          console.log('COMPARING', thread.title, item);
          return thread.title === item;
        });

        navigation.navigate('Entries', {
          slug: thread
            ? thread.slug.replace('https://eksisozluk.com', '')
            : res.threads[0].slug.replace('https://eksisozluk.com', ''),
          title: thread ? thread.title : res.threads[0].title,
          isSearch: true,
        });
      } catch (e) {
        console.log(e);
      }
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
      <View style={{paddingBottom: 12}}>
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
          <SearchInput
            autoCompleteResults={autoCompleteResults}
            setAutoCompleteResults={setAutoCompleteResults}
            setValue={setSearchValue}
            value={searchValue}
          />
        </View>
      </View>
      {autoCompleteResults?.length > 0 && <DropDown />}

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
