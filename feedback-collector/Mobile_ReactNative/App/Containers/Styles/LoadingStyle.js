import {StyleSheet} from 'react-native';
import {Metrics, ApplicationStyles} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo + 150,
    width: Metrics.images.logo + 150,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
});
