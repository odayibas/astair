import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import StepIndicator from 'react-native-step-indicator';

const labels = [
  'The Date Of Schedule',
  'Room and Start Time',
  'End Time Of Schelude',
  'Attenders Selection',
  'The         Summary',
];

export default class StepIndicator1 extends React.Component {
  static propTypes = {
    currentPosition: PropTypes.number,
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingBottom: 10,
          paddingTop: 10,
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 15,
          marginRight: 15,
          borderRadius: 20,
        }}>
        <StepIndicator
          customStyles={{
            stepIndicatorSize: 30,
            currentStepIndicatorSize: 40,
            separatorStrokeWidth: 3,
            currentStepStrokeWidth: 5,
            stepStrokeCurrentColor: '#304FFE',
            separatorFinishedColor: '#3949AB',
            separatorUnFinishedColor: '#aaaaaa',
            stepIndicatorFinishedColor: '#3949AB',
            stepIndicatorUnFinishedColor: '#aaaaaa',
            stepIndicatorCurrentColor: '#E8EAF6',
            stepIndicatorLabelFontSize: 15,
            currentStepIndicatorLabelFontSize: 15,
            stepIndicatorLabelCurrentColor: '#000000',
            stepIndicatorLabelFinishedColor: '#E8EAF6',
            stepIndicatorLabelUnFinishedColor: '#FAFAFA',
            labelColor: '#666666',
            labelSize: 15,
            currentStepLabelColor: '#3949AB',
          }}
          currentPosition={this.props.currentPosition}
          labels={labels}
        />
      </View>
    );
  }
}
