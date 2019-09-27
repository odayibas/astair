import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts, ApplicationStyles} from '../../Themes';
import {Dimensions} from 'react-native';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginBottom: 36,
    paddingTop: Metrics.section,
  },
  Text: {
    ...Fonts.style.h2,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 70,
  },
  Textcyan: {
    ...Fonts.style.h2,
    textAlign: 'center',
    color: 'cyan',
    fontSize: 70,
    marginTop: 30,
    marginBottom: 50,
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
    marginTop: Metrics.doubleBaseMargin,
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flex: 1,
  },
  centered: {
    alignItems: 'center',
  },
  componentButton: {
    borderWidth: 4,
    borderColor: Colors.border,
    borderRadius: 100,
    marginLeft: 20,
    maxWidth: Dimensions.get('window').width / 2 - 30,
  },
  apiButton: {
    borderColor: Colors.border,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  usageButton: {
    borderColor: Colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  deviceButton: {
    borderColor: Colors.border,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  sectionText: {
    textAlign: 'center',
    fontFamily: Fonts.base,
    fontSize: 14,
    marginHorizontal: Metrics.baseMargin,
    lineHeight: 30,
    marginVertical: Metrics.doubleBaseMargin,
    color: Colors.text,
  },
  banner: {
    position: 'absolute',
    width: Metrics.screenWidth,
    backgroundColor: Colors.banner,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
  },
  bannerLabel: {
    ...Fonts.style.h5,
    fontSize: 12,
    color: Colors.snow,
  },
});
