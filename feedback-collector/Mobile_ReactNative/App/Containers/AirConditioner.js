import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import ButtonBox from '../Components/ButtonBox';
import {Images} from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import {Snackbar} from 'react-native-paper';
// Styles
import styles from './Styles/AirConditionerStyle';

export default class AirConditioner extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  openScheduler = () => {
    this.props.navigation.navigate('1');
  };

  openManage = () => {
    this.props.navigation.navigate('');
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
              text="Graphs"
            />
            <ButtonBox
              onPress={this.openAC}
              style={styles.componentButton}
              image={Images.manageicon}
              text="Manual Override"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonBox
              onPress={this.openScheduler}
              style={styles.componentButton}
              image={Images.newicon}
              text="How you Feeling?"
            />
            <ButtonBox
              onPress={this.openAC}
              style={styles.componentButton}
              image={Images.manageicon}
              text="FAQ"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
