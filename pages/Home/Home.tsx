import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native-ui-lib';
import Loading from '../../components/Loading/Loading';
import {Topic} from '../../services/interfaces';
import {getTopics} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {styles} from './Home.style';

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
      <SafeAreaView edges={['bottom']} />
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
  );
};

export default Home;
