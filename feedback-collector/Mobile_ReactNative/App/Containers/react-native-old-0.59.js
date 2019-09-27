import React, {Component} from 'react';
import {
  Text,
  Container,
  Header,
  Left,
  Separator,
  Content,
  ListItem,
  Card,
  Button,
  Icon,
  Body,
  Title,
  Right,
  View,
} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import {ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {Snackbar} from 'react-native-paper';

const customStyles = {
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
};

const labels = [
  'The Date Of Schedule',
  'Room and Start Time',
  'End Time Of Schelude',
  'Attenders Selection',
  'The         Summary',
];

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      dateselected: '',
      roomselected: '',
      clockselected: '',
      peopleselected: [],
      timeandroomavailabletoselect: [
        {id: 0, time: '10:30', room: 'alpha'},
        {id: 1, time: '10:30', room: 'beta'},
        {id: 2, time: '10:30', room: 'charlie'},
        {id: 3, time: '11:30', room: 'alpha1'},
        {id: 4, time: '11:30', room: 'beta1'},
        {id: 5, time: '11:30', room: 'charlie1'},
        {id: 6, time: '11:30', room: 'alpha1'},
        {id: 7, time: '11:30', room: 'beta1'},
        {id: 8, time: '11:30', room: 'charlie1'},
        {id: 9, time: '11:30', room: 'alpha1'},
        {id: 10, time: '11:30', room: 'beta1'},
        {id: 11, time: '11:30', room: 'charlie1'},
        {id: 12, time: '11:30', room: 'alpha1'},
        {id: 13, time: '11:30', room: 'beta1'},
        {id: 14, time: '11:30', room: 'charlie1'},
      ],
      endtimeavailabletoselect: [
        {id: 0, time: '10:30', room: 'alpha'},
        {id: 1, time: '11:30', room: 'alpha'},
        {id: 2, time: '12:30', room: 'alpha'},
      ],
      peopleavailabletoselect: [
        {
          name: 'People1',
        },
        {
          name: 'People2',
        },
        {
          name: 'People3',
        },
      ],
      endclockselected: '',
      timegap: '',
      viewdate: 1,
      viewenddateandgap: 0,
      viewclockandroom: 0,
      viewpeople: 0,
      summary: 0,
      currentPosition: 0,
      snackbarvisible: false,
      snackbarvisiblelabel: '',
      warnsnackbarvisible: false,
      warnsnackbarvisiblelabel: '',
    };
  }

  componentWillUnmount() {
    this.setState({
      dateselected: '',
      roomselected: '',
      clockselected: '',
      peopleselected: [],
      endclockselected: '',
      timegap: '',
      viewdate: 1,
      viewenddateandgap: 0,
      viewclockandroom: 0,
      viewpeople: 0,
      summary: 0,
      currentPosition: 0,
      snackbarvisible: false,
      snackbarvisiblelabel: '',
    });
  }

  onPageChange(position) {
    this.setState({currentPosition: position});
  }
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

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
                this.componentWillUnmount();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Schedule</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
          <View
            style={{
              marginTop: 20,
              marginBottom: 30,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <Card style={{padding: 20}}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={this.state.currentPosition}
                labels={labels}
              />
            </Card>
          </View>

          {this.state.viewdate === 1 && (
            <View>
              <Card style={{marginLeft: 25, marginRight: 25, marginTop: 25}}>
                <Calendar
                  onDayPress={day => {
                    this.setState(() => ({
                      snackbarvisible: false,
                    }));
                    this.setState(() => ({
                      snackbarvisible: true,
                      snackbarvisiblelabel:
                        'Selected Date:' +
                        day.day +
                        '/' +
                        day.month +
                        '/' +
                        day.year,
                      currentPosition: 1,
                      dateselected: day.dateString,
                      viewdate: 0,
                      viewclockandroom: 1,
                    }));
                  }}
                  hideExtraDays={true}
                  minDate={this.todaydate()}
                  // Collection of dates that have to be marked. Default = {}
                  markedDates={{
                    '2019-09-11': {
                      selected: true,
                      marked: true,
                      selectedColor: 'blue',
                    },
                    '2019-09-16': {marked: true},
                    '2019-09-17': {
                      marked: true,
                      dotColor: 'red',
                      activeOpacity: 0,
                    },
                    '2019-09-04': {disabled: true, disableTouchEvent: true},
                  }}
                />
              </Card>
            </View>
          )}

          {this.state.viewclockandroom === 1 && (
            <View>
              {Object.keys(
                this.groupBy(this.state.timeandroomavailabletoselect, 'time'),
              ).map((key, index) => (
                <Card
                  style={{marginLeft: 15, marginRight: 15, marginBottom: 25}}
                  key={index}>
                  <Content>
                    <Separator bordered style={{backgroundColor: '#E8EAF6'}}>
                      <Text style={{fontSize: 16, color: '#424242'}}>
                        {'At: ' + key + ' Available Rooms'}
                      </Text>
                    </Separator>
                    {this.state.timeandroomavailabletoselect
                      .filter(el => el.time === key)
                      .map((item, index1) => (
                        <ListItem
                          key={index1}
                          style={{}}
                          onPress={() => {
                            this.setState(() => ({
                              snackbarvisible: false,
                            }));
                            this.setState(() => ({
                              snackbarvisible: true,
                              snackbarvisiblelabel:
                                'Selected Room ' +
                                item.room +
                                ' Starting at ' +
                                item.time,
                              currentPosition: 2,
                              viewclockandroom: 0,
                              viewenddateandgap: 1,
                              clockselected: item.time,
                              roomselected: item.room,
                            }));
                          }}>
                          <Text>{item.room}</Text>
                        </ListItem>
                      ))}
                  </Content>
                </Card>
              ))}
            </View>
          )}

          {this.state.viewenddateandgap === 1 && (
            <View>
              <Card
                style={{
                  marginBottom: 25,
                  marginTop: 10,
                  marginLeft: 15,
                  marginRight: 15,
                  padding: 10,
                  backgroundColor: '#E8EAF6',
                }}>
                <Text style={{fontSize: 16, margin: 5}}>
                  You have selected {this.state.roomselected} Room, Starting at{' '}
                  {this.state.clockselected}
                </Text>
              </Card>

              <Card style={{marginLeft: 15, marginRight: 15}}>
                <Content>
                  <Separator bordered style={{backgroundColor: '#E8EAF6'}}>
                    <Text style={{fontSize: 16, color: '#424242'}}>
                      {'Possible Meeting Finishing Times'}
                    </Text>
                  </Separator>
                  {this.state.endtimeavailabletoselect.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        style={{}}
                        onPress={() => {
                          this.setState(() => ({
                            snackbarvisible: false,
                          }));
                          this.setState(() => ({
                            snackbarvisible: true,
                            snackbarvisiblelabel: 'Until:' + item.time,
                            endclockselected: item.time,
                            currentPosition: 3,
                            viewpeople: 1,
                            viewenddateandgap: 0,
                          }));
                        }}>
                        <Text>{item.time}</Text>
                      </ListItem>
                    );
                  })}
                </Content>
              </Card>
            </View>
          )}
          {this.state.viewpeople === 1 && (
            <View>
              <Card
                style={{
                  marginBottom: 25,
                  marginTop: 10,
                  marginLeft: 15,
                  marginRight: 15,
                  padding: 10,
                  backgroundColor: '#E8EAF6',
                }}>
                <Text style={{fontSize: 16, margin: 5}}>
                  Your Meeting Starts at {this.state.clockselected} and Finishes
                  at {this.state.endclockselected}
                </Text>
              </Card>
              {this.state.peopleavailabletoselect.length !== 0 && (
                <Card style={{marginLeft: 15, marginRight: 15}}>
                  <Separator bordered style={{backgroundColor: '#E8EAF6'}}>
                    <Text style={{fontSize: 16, color: '#424242'}}>
                      {'Possible People At That Time'}
                    </Text>
                  </Separator>
                  {this.state.peopleavailabletoselect.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        onPress={() => {
                          var array = this.state.peopleavailabletoselect;
                          var index1 = array.indexOf(item);
                          if (index1 > -1) {
                            array.splice(index1, 1);
                          }
                          this.setState({peopleavailabletoselect: array});
                          this.setState({
                            peopleselected: [
                              ...this.state.peopleselected,
                              item.name,
                            ],
                          });
                        }}>
                        <Text>{item.name}</Text>
                      </ListItem>
                    );
                  })}
                </Card>
              )}
              {this.state.peopleselected !== 0 && (
                <Card
                  style={{marginLeft: 15, marginRight: 15, marginBottom: 20}}>
                  <Content>
                    <Separator bordered style={{backgroundColor: '#E8EAF6'}}>
                      <Text style={{fontSize: 16, color: '#424242'}}>
                        {'Selected People'}
                      </Text>
                    </Separator>
                    {this.state.peopleselected.map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          onPress={() => {
                            var array = this.state.peopleselected;
                            var index1 = array.indexOf(item);
                            if (index1 > -1) {
                              array.splice(index1, 1);
                            }
                            this.setState({peopleselected: array});
                            this.setState({
                              peopleavailabletoselect: [
                                ...this.state.peopleavailabletoselect,
                                {name: item},
                              ],
                            });
                          }}>
                          <Text>{item}</Text>
                        </ListItem>
                      );
                    })}
                  </Content>
                </Card>
              )}
              <Button
                block
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                }}
                onPress={() => {
                  if (this.state.peopleselected.length === 0) {
                    this.setState({
                      warnsnackbarvisible: false,
                      snackbarvisible: false,
                    });
                    this.setState({
                      warnsnackbarvisible: true,
                      warnsnackbarvisiblelabel:
                        'Please Select At Least One Person',
                    });
                  } else {
                    this.setState(() => ({
                      snackbarvisible: false,
                    }));
                    this.setState(() => ({
                      snackbarvisible: true,
                      snackbarvisiblelabel:
                        'You added' +
                        this.state.peopleselected.length +
                        ' People to your meeting.',
                      currentPosition: 4,
                      viewpeople: 0,
                      summary: 1,
                    }));
                  }
                }}>
                <Text>Ok?</Text>
              </Button>
            </View>
          )}
          {this.state.summary === 1 && (
            <View>
              <Card style={{marginLeft: 15, marginRight: 15, marginBottom: 20}}>
                <Content>
                  <Separator
                    bordered
                    style={{
                      paddingTop: 30,
                      paddingBottom: 30,
                      backgroundColor: '#E8EAF6',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#424242',
                      }}>
                      {'At the date of ' +
                        this.state.dateselected +
                        ' starts at ' +
                        this.state.clockselected +
                        ' finishes at ' +
                        this.state.endclockselected +
                        ' in the ' +
                        this.state.roomselected +
                        ' room you are going to invite'}
                    </Text>
                  </Separator>
                  {this.state.peopleselected.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        onPress={() => {
                          var array = this.state.peopleselected;
                          var index1 = array.indexOf(item);
                          if (index1 > -1) {
                            array.splice(index1, 1);
                          }
                          this.setState({peopleselected: array});
                          this.setState({
                            peopleavailabletoselect: [
                              ...this.state.peopleavailabletoselect,
                              {name: item},
                            ],
                          });
                        }}>
                        <Text>{item}</Text>
                      </ListItem>
                    );
                  })}
                </Content>
              </Card>
              <Button
                block
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                }}
                onPress={() => {
                  this.setState({
                    dateselected: '',
                    roomselected: '',
                    clockselected: '',
                    endclockselected: '',
                    timegap: '',
                    peopleselected: [],
                    viewdate: 1,
                    summary: 0,
                    viewenddateandgap: 0,
                    viewclockandroom: 0,
                    currentPosition: 0,
                    viewpeople: 0,
                  });
                  //post?
                }}>
                <Text>SAVE CHANGES?</Text>
              </Button>
            </View>
          )}
        </ScrollView>
        <Snackbar
          visible={this.state.warnsnackbarvisible}
          duration={1000}
          onDismiss={() => this.setState({warnsnackbarvisible: false})}
          action={{
            label: 'Ok',
            onPress: () => {},
          }}>
          {this.state.warnsnackbarvisiblelabel}
        </Snackbar>
        <Snackbar
          visible={this.state.snackbarvisible}
          duration={1500}
          onDismiss={() => this.setState({snackbarvisible: false})}
          action={{
            label: 'Undo',
            onPress: () => {
              if (
                this.state.snackbarvisiblelabel.startsWith('Selected Date:')
              ) {
                this.setState({
                  dateselected: '',
                  roomselected: '',
                  clockselected: '',
                  endclockselected: '',
                  timegap: '',
                  peopleselected: [],
                  viewdate: 1,
                  summary: 0,
                  viewenddateandgap: 0,
                  viewclockandroom: 0,
                  currentPosition: 0,
                  viewpeople: 0,
                });
              } else if (
                this.state.snackbarvisiblelabel.startsWith('Selected Room')
              ) {
                this.setState({
                  viewenddateandgap: 0,
                  summary: 0,
                  viewclockandroom: 1,
                  roomselected: '',
                  clockselected: '',
                  endclockselected: '',
                  timegap: '',
                  currentPosition: 1,
                  peopleselected: [],
                });
              } else if (this.state.snackbarvisiblelabel.startsWith('Until:')) {
                this.setState({
                  viewpeople: 0,
                  summary: 0,
                  viewenddateandgap: 1,
                  endclockselected: '',
                  timegap: '',
                  currentPosition: 2,
                  peopleselected: [],
                });
              } else if (
                this.state.snackbarvisiblelabel.startsWith('You added')
              ) {
                this.setState({
                  viewpeople: 1,
                  summary: 0,
                  currentPosition: 3,
                  peopleselected: [],
                });
              }
            },
          }}>
          {this.state.snackbarvisiblelabel}
        </Snackbar>
      </Container>
    );
  }
}

export default Schedule;
