import {Typography, Colors} from 'react-native-ui-lib';

Colors.loadColors({
  eksiGreen: '#80c14c',
  darkMode: '#2c2d2c',
  darkerMode: '#1f1f1f',
  textColor: '#b9b7b7',
  darkerTextColor: '#666666',
});

Typography.loadTypographies({
  h1: {fontSize: 44, fontFamily: 'SourceSansPro-Bold'},
  h2: {fontSize: 32, fontFamily: 'SourceSansPro-Bold'},
  h3: {fontSize: 24, fontFamily: 'SourceSansPro-Bold'},
  h4: {fontSize: 20, fontFamily: 'SourceSansPro-Bold'},

  regularText: {fontSize: 16, fontFamily: 'SourceSansPro-Regular'},
});
