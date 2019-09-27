import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import ButtonBox from '../Components/ButtonBox';
import {Images} from '../Themes';

import styles from './Styles/SchedulerStyle';
export default class Scheduler extends React.Component {
  openScheduler = () => {
    this.props.navigation.navigate('newschedule');
  };

  openManage = () => {
    this.props.navigation.navigate('manageschedules');
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.container}>
          <Text style={styles.Text}>Please Select Your Action</Text>
          <View style={styles.buttonsContainer}>
            <ButtonBox
              onPress={this.openScheduler}
              style={styles.componentButton}
              image={Images.newicon}
              text="Create New"
            />
            <ButtonBox
              onPress={this.openAC}
              style={styles.componentButton}
              image={Images.manageicon}
              text="Manage"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
