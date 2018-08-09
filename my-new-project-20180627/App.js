import React, { Component } from 'react';
import {
  Alert,
  Linking,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Button,
  ImageBackground,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeView extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/Screenshot.png')}
        style={{width: '100%', height: '100%'}}
      > 
        <Text style={styles.paragraph1}>
          Welcome to the book library!
        </Text>
        <Text style={styles.paragraph2}>
          Press the button to scan a barcode
        </Text>
        <Button
          icon={
            <Icon
              name='arrow-right'
              size={15}
              color='#fff'
            />
          }
          title="SCAN"
          onPress={() => navigate('Scan')}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          // buttonStyle={{
          //   backgroundColor: "rgba(92, 99,216, 1)",
          //   width: 300,
          //   height: 45,
          //   borderColor: "#841584",
          //   borderWidth: 1,
          //   borderRadius: 5
          // }}
        />
        <Button
          icon={
            <Icon
              name='arrow-right'
              size={15}
              color='#fff'
            />
          }
          title="INVENTORY"
          onPress={() => navigate('Inventory')}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          // buttonStyle={{
          //   backgroundColor: "rgba(92, 99,216, 1)",
          //   width: 300,
          //   height: 45,
          //   borderColor: "#841584",
          //   borderWidth: 1,
          //   borderRadius: 5
          // }}
        />
        <StatusBar hidden />
        </ImageBackground>
      </View>
    );
  }
}

class InventoryView extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph1}>
          Welcome to Inventory!
        </Text>
        <Text style={styles.paragraph2}>
          The current libray holds 1000 books.
        </Text>
        <StatusBar hidden />
      </View>
    );
  }
}

class ScannerView extends Component {
  state = {
    hasCamera: null,
    scannedRes: null,
  };

  componentDidMount() {
    this._requireCameraUse();
  }

  _requireCameraUse = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCamera: status === 'granted',
    });
  };

  _getReadRes = result => {
    if (result.data !== this.state.scannedRes) {
      LayoutAnimation.spring();
      this.setState({ scannedRes: result.data });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
         
        {/* Bring up the scanner */}
        {this.state.hasCamera === null
          ? <Text>Require a camera usage</Text>
          : this.state.hasCamera === false
            ? <Text style={{ color: '#fff' }}>
              No camera is available
                </Text>
            : <BarCodeScanner
              onBarCodeRead={this._getReadRes}
              style={{
                height: 200,
                width: 200,
              }}
            />}

        {this._showScannedRes()}
        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.scannedRes),
        },
        { text: 'No', onPress: () => { } },
      ],
      { cancellable: false }
    );
  };

  _scanCancel = () => {
    this.setState({ scannedRes: null });
  };

  _showScannedRes = () => {
    if (!this.state.scannedRes) {
      return;
    }
    Alert.alert('Scan successful!')
    return (
      <View style={styles.bottomBar}>
        <Text numberOfLines={1} style={styles.urlText}>
          {this.state.scannedRes}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(138,187,216,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph1: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  paragraph2: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});

export default createStackNavigator(
  {
    Home: {
      screen: HomeView
    },
    Scan: {
      screen: ScannerView
    },
    Inventory: {
      screen: InventoryView
    },
  },
  {
    initialRouteName: 'Home',
  }
);