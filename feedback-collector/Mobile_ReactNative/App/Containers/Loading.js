import React from 'react';
import {View, ActivityIndicator, Image, ScrollView, Text} from 'react-native';
import styles from './Styles/LoadingStyle';

import {Images} from '../Themes';
export default class Startup extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Make Offices Great Again</Text>
          </View>

          <View>
            <ActivityIndicator size="large" color="#E3F2FD" />
          </View>
        </ScrollView>
      </View>
    );
  }
}
