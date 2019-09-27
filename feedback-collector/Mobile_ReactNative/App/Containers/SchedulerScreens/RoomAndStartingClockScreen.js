import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Stepindicator from '../../Components/StepIndicator';
import styles from './Styles/RoomAndStartingClockScreenStyle';
import {Table, Row} from 'react-native-table-component';
import Swiper from 'react-native-swiper';
import {Snackbar, TouchableRipple} from 'react-native-paper';

const table = {
  tableHead: ['Room Alpha', 'Room Beta', 'Room Chalie'],
  tableTitle: [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
  ],
  tableData: [
    [
      '1',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'The Wise Pesasdsaasdsson123',
      'The Wise Person',
      'The Wise Person',
      '',
    ],
    [
      '2',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'The Wise Pesasdsaasdsson',
      'The Wise Person',
      'The Wise Person',
      '',
    ],
    [
      '3',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'The Wise Pesasdsaasdsson',
      'The Wise Person',
      'The Wise Person',
      '',
    ],
  ],
};
//action dialog ekle room seçim
export default class RoomAndStartingClockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.container}
          ref="container">
          <Stepindicator currentPosition={1} />
          <Text style={styles.Text}>Select Desired Room and Zero Hour</Text>
          <Swiper
            ref={swiper => {
              this._swiper = swiper;
            }}
            style={styles.wrapper}
            height={Dimensions.get('window').height * 0.8}
            dotColor={'white'}
            horizontal={true}>
            {table.tableData.map((cellDataout, cellIndexout) => (
              <Table key={cellIndexout} style={styles.tablestyle}>
                <TouchableHighlight
                  onPress={() => this._swiper.scrollBy(1)}
                  style={styles.tablerow}>
                  <Row
                    style={styles.tableHead}
                    data={[table.tableHead[cellIndexout]]}
                    textStyle={styles.tabletexthead}
                  />
                </TouchableHighlight>
                {cellDataout.map((datain, dataindex) =>
                  datain !== '' ? (
                    <TouchableRipple
                      onPress={() =>
                        this.setState(state => ({visible: !state.visible}))
                      }
                      style={styles.tablerow}
                      key={dataindex}>
                      <Row
                        flexArr={[1, 4]}
                        textStyle={styles.tabletext}
                        data={[table.tableTitle[dataindex], datain]}
                      />
                    </TouchableRipple>
                  ) : (
                    <TouchableRipple
                      onPress={() => {
                        this.props.navigation.navigate('EndingClockScreen');
                      }}
                      style={styles.tablerow}
                      key={dataindex}>
                      <Row
                        flexArr={[1, 4]}
                        textStyle={styles.tabletext}
                        data={[table.tableTitle[dataindex], datain]}
                      />
                    </TouchableRipple>
                  ),
                )}
              </Table>
            ))}
          </Swiper>
        </ScrollView>
        <Snackbar
          duration={1500}
          style={{backgroundColor: '#5f5fc4'}}
          visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})}
          action={{
            label: 'OK?',
            onPress: () => {
              // Do Something Admin
            },
          }}>
          <Text style={{color: '#FFFFFF'}}>Room Already Occupied</Text>
        </Snackbar>
      </View>
    );
  }
}
