import React from 'react';
import {ScrollView, View, Text, TouchableHighlight} from 'react-native';
import Stepindicator from '../../Components/StepIndicator';
import {Table, Row} from 'react-native-table-component';
import {Snackbar, TouchableRipple} from 'react-native-paper';

import styles from './Styles/EndingClockScreenStyle';
const table = {
  tableHead: ['Room Alpha'],
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
};
const selecteddata = ['Room Alpha', '13:00'];
var possible = [];

//sonraki ekrana geçis ekle
//sonraki ekran sag asagi + buttonu tıklayınca stack pop yap kişileri listele kişiler listesi sola dogru itilince silinebilsin geri + buttonu gelsin ppl secme ekraninda + ikonu ok ikonu olsun anime et
//summarye basinca stacke ekle duzelttir? son
//ac kontrol ayarla ac vote ayarla ac degerlerini goster
export default class EndingClockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.findpossible();
  }

  findpossible() {
    let possibletmp = [];
    var selectedindex = table.tableTitle.indexOf(selecteddata[1]) + 1;
    for (; selectedindex < table.tableData.length; selectedindex++) {
      if (table.tableData[selectedindex] === '') {
        possible.push(selectedindex);
      } else {
        return;
      }
    }
    possible = possibletmp;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.container}
          ref="container">
          <Stepindicator currentPosition={2} />
          <Text style={styles.Text}>Select Desired Ending Time</Text>

          <Table style={styles.tablestyle}>
            <TouchableHighlight style={styles.tablerow}>
              <Row
                style={styles.tableHead}
                data={table.tableHead}
                textStyle={styles.tabletexthead}
              />
            </TouchableHighlight>
            {table.tableData.map((datain, dataindex) =>
              possible.indexOf(dataindex) === -1 ? (
                possible[0] - 1 === dataindex ? (
                  <TouchableRipple
                    onPress={() => this.setState(() => ({visible: true}))}
                    style={styles.tablerowselected}
                    key={dataindex}>
                    <Row
                      flexArr={[1, 4]}
                      textStyle={styles.tabletext}
                      data={[table.tableTitle[dataindex], 'Selected']}
                    />
                  </TouchableRipple>
                ) : (
                  <TouchableRipple
                    onPress={() => this.setState(() => ({visible: true}))}
                    style={styles.tablerow}
                    key={dataindex}>
                    <Row
                      flexArr={[1, 4]}
                      textStyle={styles.tabletext}
                      data={[table.tableTitle[dataindex], datain]}
                    />
                  </TouchableRipple>
                )
              ) : (
                <TouchableRipple
                  onPress={() => {
                    this.props.navigation.navigate('PeopleSelectScreen');
                  }}
                  style={styles.tablerowselected}
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
        </ScrollView>
        <Snackbar
          duration={1500}
          theme={{colors: {accent: 'black'}}}
          style={{backgroundColor: '#FFFFFF'}}
          visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})}
          action={{
            label: 'Contact Administrator',
            onPress: () => {
              // Do Something Admin
            },
          }}>
          <Text style={{color: '#000000'}}>
            You can only select within time range.
          </Text>
        </Snackbar>
      </View>
    );
  }
}
