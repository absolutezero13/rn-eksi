import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native-ui-lib';
import {getUser} from '../../services/services';

const UserPage = () => {
  const route = useRoute();
  useEffect(() => {
    getUser(route.params.nick).then(res => {
      console.log(res);
    });
  }, []);

  return <View></View>;
};

export default UserPage;
