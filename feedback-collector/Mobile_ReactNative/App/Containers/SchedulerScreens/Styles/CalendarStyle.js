import {StyleSheet} from 'react-native';
import {ApplicationStyles, Fonts} from '../../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  Text: {
    ...Fonts.style.h2,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginBottom: 50,
    marginTop: 40,
  },
  Calendar: {
    marginTop: 10,
    borderColor: '#FFFFFF',
    borderRadius: 40,
    paddingBottom: 25,
    marginLeft: 20,
    marginRight: 10,
  },
});
