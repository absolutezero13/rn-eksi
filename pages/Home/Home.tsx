import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, Image} from 'react-native-ui-lib';
import Loading from '../../components/Loading/Loading';
import {Topic} from '../../services/interfaces';
import {getTopics} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {styles} from './Home.style';
import eksiLogoWhite from '../../imgs/eksi-logo-white.png';

const Home = () => {
  const navigation = useNavigation();
  const [hotTopics, setHotTopics] = useState<Topic[]>([]);

  useEffect(() => {
    getTopics().then(res => {
      setHotTopics(res);
    });
  }, []);

  const renderTopic = ({item}: {item: Topic}) => (
    <TouchableOpacity onPress={() => pressItem(item)} style={styles.topic}>
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

  const pressItem = (item: Topic) => {
    navigation.navigate('Entries', {
      slug: item.slug,
      title: item.title,
    });
  };

  return (
    <View paddingH-18 backgroundColor={UIColors.darkMode} flex-1>
      <SafeAreaView
        edges={['bottom']}
        style={{
          paddingTop: 12,
        }}
      />
      <Image
        source={eksiLogoWhite}
        style={{
          width: 120,
          height: 25,
        }}
        resizeMode="contain"
      />
      <View flex-1>
        {hotTopics.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}
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
