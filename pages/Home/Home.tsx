import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Image, Text, Checkbox} from 'react-native-ui-lib';
import Loading from '../../components/Loading/Loading';
import {Debe, Topic} from '../../services/interfaces';
import {getDebe, getSearchResults, getTopics} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {styles, topicLinkStyles} from './Home.style';
import eksiLogoWhite from '../../imgs/eksi-logo-white.png';
import nextIcon from '../../imgs/nextIcon.png';
import {shadows} from '../../theme/shadows';
import TopicComponent from '../../components/Topic/Topic';
import SearchInput from '../../components/SearchInput/SearchInput';
import PressableOpacity from '../../components/PressableOpacityComponent/PressableOpacity';
import {screenWidth} from '../../utils/constants';
import slugify from 'slugify';
import {RefreshControl, TextInput} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [topics, setTopics] = useState<Topic[] | Debe[]>([]);
  const [check, setCheck] = useState(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedTopicFilter, setSelectedTopicFilter] =
    useState<string>('agenda');
  const [autoCompleteResults, setAutoCompleteResults] = React.useState<
    string[] | []
  >([]);
  const inputRef = React.useRef<TextInput>(null);

  useEffect(() => {
    setTopics([]);
    if (selectedTopicFilter === 'agenda') {
      getTopics().then(res => {
        setTopics(res);
      });
    } else {
      getDebe().then(res => {
        setTopics(res.entries);
      });
    }
  }, [navigation, selectedTopicFilter]);

  const pressItem = (item: Topic | Debe) => {
    if (selectedTopicFilter === 'agenda') {
      navigation.navigate('Entries', {
        slug: item.slug,
        title: item.title,
        isSearch: false,
      });
    } else {
      navigation.navigate('DebeEntry', {
        debe: item,
      });
    }
  };

  const pressDropDownItem = (item: string) => {
    setSearchValue(item);
    setAutoCompleteResults([]);
    inputRef?.current.blur();
    if (item.startsWith('@')) {
      const nick = item.slice(1, item.length);

      navigation.navigate('UserPage', {
        nick,
      });
    } else {
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
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    if (selectedTopicFilter === 'agenda') {
      getTopics().then(res => {
        setTopics(res);
        setIsRefreshing(false);
      });
    } else {
      getDebe().then(res => {
        setTopics(res.entries);
        setIsRefreshing(false);
      });
    }
  };

  const onFavPress = () => {
    navigation.navigate('Entries', {
      // slug: item.slug,
      title: 'Favoriler',
      isFav: true,
    });
  };

  const DropDown = () => {
    return (
      <View width={screenWidth / 2} style={styles.dropDown}>
        <FlatList
          data={autoCompleteResults}
          renderItem={({item}) => (
            <PressableOpacity onPress={() => pressDropDownItem(item)}>
              <Text darkerTextColor style={{fontSize: 14}} regularText>
                {item}{' '}
              </Text>
            </PressableOpacity>
          )}
        />
      </View>
    );
  };

  const renderTopic = ({item}: {item: Topic | Debe}) => (
    <TopicComponent onPress={() => pressItem(item)} item={item} />
  );

  const TopicLink = ({text, value}: {text: string; value: string}) => {
    return (
      <PressableOpacity
        onPress={() => setSelectedTopicFilter(value)}
        style={topicLinkStyles(selectedTopicFilter, value).container}>
        <Text
          style={topicLinkStyles(selectedTopicFilter, value).text}
          center
          regularText>
          {text}{' '}
        </Text>
      </PressableOpacity>
    );
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
        <View row centerV spread paddingH-5 paddingB-6>
          <Image
            source={eksiLogoWhite}
            style={styles.img}
            resizeMode="contain"
          />
          <SearchInput
            inputRef={inputRef}
            autoCompleteResults={autoCompleteResults}
            setAutoCompleteResults={setAutoCompleteResults}
            setValue={setSearchValue}
            value={searchValue}
          />
        </View>
        <View style={{overflow: 'hidden', paddingBottom: 12}}>
          <View
            paddingB-12
            backgroundColor={UIColors.darkMode}
            style={shadows.primaryShadow}
            centerH
            row>
            <TopicLink value="agenda" text="Gündem" />
            <TopicLink value="debe" text="Debe" />
            <PressableOpacity
              onPress={onFavPress}
              style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
              <Text regularText textColor>
                Favoriler
              </Text>
              <Image width={24} height={24} source={nextIcon} />
            </PressableOpacity>
          </View>
        </View>
        <View paddingH-12 row centerV>
          <Checkbox
            value={check}
            onValueChange={() => setCheck(!check)}
            color={UIColors.eksiGreen}
          />
          <Text marginL-10 textColor>
            zam başlıklarını filtrele
          </Text>
        </View>
      </View>
      {autoCompleteResults?.length > 0 && <DropDown />}

      <View flex-1 paddingH-18>
        {topics.length ? (
          <FlatList
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}
            style={{flex: 1}}
            initialNumToRender={50}
            data={
              check
                ? topics.filter(topic => !topic.title.includes('zam'))
                : topics
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[UIColors.eksiGreen, UIColors.textColor]}
              />
            }
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
