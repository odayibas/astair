import {FAB, Searchbar} from 'react-native-paper';
import styles from './Styles/PeopleSelectScreenStyle';
import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import Stepindicator from '../../Components/StepIndicator';
import {Snackbar} from 'react-native-paper';
import Swipeable from 'react-native-swipeable-row';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PeopleSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toggle: false,
      firstQuery: '',
      People: [
        'Vladimir',
        'Vladimir1',
        'Vladimir2',
        'Vladimir3',
        'Vladimir4',
        'Vladimir5',
        'Vladimir6',
        'Vladimir7',
        'Vladimir8',
        'Boris',
        'Boris1',
        'Boris2',
        'Boris3',
        'Boris4',
        'Boris5',
        'Boris6',
        'Boris7',
        'Boris8',
      ],
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Stepindicator currentPosition={3} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.container}>
          <Text style={styles.Text}>Selected People</Text>
          <Searchbar
            style={{marginBottom: 40, marginLeft: 15, marginRight: 15}}
            placeholder="Search"
            onChangeText={query => {
              this.setState({firstQuery: query});
            }}
            value={this.state.firstQuery}
          />
          {this.state.People.map((data, index) => (
            <SwipeableListItem key={index} name={data} />
          ))}
        </ScrollView>
        <FAB.Group
          color={'#FFFFFF'}
          fabStyle={{backgroundColor: '#303f9f'}}
          open={this.state.open}
          icon={this.state.open ? 'done' : 'create'}
          actions={[
            {icon: 'add', label: 'Add People', onPress: () => {}},
            {icon: 'close', label: 'Remove People', onPress: () => {}},
          ]}
          onStateChange={({open}) => this.setState({open})}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        />
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
          <Text style={{color: '#000000'}}>Successfully Deleted.</Text>
        </Snackbar>
      </View>
    );
  }
}

class SwipeableListItem extends React.Component {
  state = {
    leftActionActivated: false,
    toggle: true,
  };

  render() {
    const {leftActionActivated, toggle} = this.state;
    if (this.state.toggle === true) {
      return (
        <Swipeable
          leftActionActivationDistance={100}
          leftContent={
            <View
              style={[
                styles.leftSwipeItem,
                {
                  backgroundColor: leftActionActivated ? 'red' : '#5f5fc4',
                },
              ]}>
              {leftActionActivated ? (
                <Icon name="trash-o" size={30} color="#FFFFFF" />
              ) : (
                <Icon name="long-arrow-right" size={30} color="#FFFFFF" />
              )}
            </View>
          }
          onLeftActionActivate={() =>
            this.setState({leftActionActivated: true})
          }
          onLeftActionDeactivate={() =>
            this.setState({leftActionActivated: false})
          }
          onLeftActionComplete={() => this.setState({toggle: !toggle})}>
          <View
            style={[
              styles.listItem,
              {backgroundColor: toggle ? '#FFFFFF' : '#FFFFFF'},
            ]}>
            <View>
              <Text style={styles.text}>{this.props.name}</Text>
            </View>
            <View>
              <Icon name="long-arrow-right" size={30} color="#001064" />
            </View>
          </View>
        </Swipeable>
      );
    } else {
      return null;
    }
  }
}
