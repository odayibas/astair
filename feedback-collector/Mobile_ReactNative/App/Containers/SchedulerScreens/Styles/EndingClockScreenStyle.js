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
  wrapper: {marginBottom: 40},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  tablestyle: {
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
  },
  tablerow: {
    borderColor: '#000051',
    borderWidth: 2,
  },
  tabletext: {
    color: '#000000',
    margin: 10,
    textAlign: 'center',
  },
  tabletexthead: {
    color: '#FFFFFF',
    margin: 10,
    textAlign: 'center',
  },
  tableHead: {
    height: 55,
    backgroundColor: '#000051',
  },

  tablerowselected: {
    borderColor: '#000051',
    borderWidth: 2,
    backgroundColor: '#e8eaf6',
  },
});
