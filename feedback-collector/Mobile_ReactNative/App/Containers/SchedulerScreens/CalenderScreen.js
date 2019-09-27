import {Calendar} from 'react-native-calendars';
import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import Stepindicator from '../../Components/StepIndicator';
import styles from './Styles/CalendarStyle';
import {UnavailableDatesInMonth} from '../@fake-db/';
import {connect} from 'react-redux';

class CalendarScreen extends React.Component {
  todaydate() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    if (month < 10) {
      month = '0' + month;
    }
    if (date < 10) {
      date = '0' + date;
    }
    return year + '-' + month + '-' + date;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container} ref="container">
          <Stepindicator currentPosition={0} />
          <Text style={styles.Text}>Select Desired Date</Text>
          <Calendar
            style={styles.Calendar}
            onDayPress={day => {
              this.props.SelectDate(day.dateString);
              this.props.navigation.navigate('RoomAndStartingClockScreen');
            }}
            hideExtraDays={true}
            minDate={this.todaydate()}
            // Collection of dates that have to be marked. Default = {}
            markedDates={UnavailableDatesInMonth}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    SelectedDate: state.scheduleReducer.SelectedDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SelectDate: payload =>
      dispatch({
        type: 'DATE',
        payload: {payload},
      }),

    // Decrease Counter
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarScreen);
