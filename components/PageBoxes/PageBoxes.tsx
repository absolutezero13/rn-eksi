import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import PressableOpacity from '../PressableOpacityComponent/PressableOpacity';
import {styles} from './PageBoxes.style';

interface IProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PageBoxes = ({totalPages, currentPage, setCurrentPage}: IProps) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);

  const onPressNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  const onPressPrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const DropDown = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: -100,
        }}>
        <FlatList
          data={Array(totalPages).fill(0)}
          style={[styles.flat, {width: totalPages.toString().length * 24}]}
          contentContainerStyle={styles.flatContainer}
          renderItem={({item, index}) => (
            <PressableOpacity>
              <Text
                regularText
                color={currentPage === index + 1 ? 'white' : 'gray'}
                onPress={() => {
                  setCurrentPage(index + 1);
                  setDropDownVisible(false);
                }}>
                {index + 1}
              </Text>
            </PressableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View height={30} centerH marginT-24 row>
      {currentPage !== 1 && (
        <View style={styles.box}>
          <PressableOpacity onPress={onPressPrevious}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../imgs/backIcon.png')}
            />
          </PressableOpacity>
        </View>
      )}
      <View>
        {dropDownVisible && <DropDown />}
        <View style={styles.box}>
          <Text
            regularText
            textColor
            onPress={() => setDropDownVisible(!dropDownVisible)}>
            {currentPage}{' '}
          </Text>
        </View>
      </View>

      <View centerV>
        <Text regularText textColor marginH-3>
          /
        </Text>
      </View>
      <View style={styles.box}>
        <Text regularText onPress={() => setCurrentPage(totalPages)} textColor>
          {totalPages}
        </Text>
      </View>
      {currentPage < totalPages && (
        <View style={styles.box}>
          <PressableOpacity onPress={onPressNext}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../imgs/nextIcon.png')}
            />
          </PressableOpacity>
        </View>
      )}
    </View>
  );
};

export default PageBoxes;
