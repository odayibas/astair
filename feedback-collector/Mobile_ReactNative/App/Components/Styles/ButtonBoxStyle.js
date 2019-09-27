import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../Themes';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth / 2,
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#283593',
  },
  image: {
    width: Metrics.icons.xl,
    height: Metrics.icons.xl,
    margin: Metrics.baseMargin,
  },
  label: {
    ...Fonts.style.h3,
    fontSize: 16,
    color: Colors.text,
  },
});
