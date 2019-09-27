import {Calendar} from 'react-native-calendars';
import React, {Component} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import {Images} from '../../Themes';

import styles from './Styles/SummaryScreenStyle';

export default class SummaryScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />

        <ScrollView style={styles.container} ref="container">
          <View style={styles.scrollContent}>
            <View style={{alignItems: 'center', paddingTop: 60}}>
              <Image source={Images.api} style={styles.logo} />
              <Text style={styles.titleText}>API</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                Testing API with Postman or APIary.io verifies the server works.
                The API Test screen is the next step; a simple in-app way to
                verify and debug your in-app API functions.
              </Text>
              <Text style={styles.sectionText}>
                Create new endpoints in Services/Api.js then add example uses to
                endpoints array in Containers/APITestingScreen.js
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
