import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  FirstPage: FirstScreen,
  SecondPage: SecondScreen,
  ThirdPage: ThirdScreen
})

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// };

