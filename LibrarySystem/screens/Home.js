import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',}}>
            <View style={{
                    flex: 1,
                    backgroundColor: '#1c2f21',
                    justifyContent: 'center'}}>
                    <Text style={{textAlign: 'right',color: 'white',fontSize: 20,paddingRight: 20}}> Library Name </Text>
            </View>
            <View style={{
                flex: 10,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <TouchableHighlight underlayColor = "#808080"
                    onPress={() => this.props.navigation.navigate('AddUserScreen')} 
                    style={styles.Button}>
                    <Image source={require('./../images/addUser.png')}
                     style={{flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined}} 
                    />
                    {/* <Text> ADD USER </Text> */}
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor = "#808080"
                    onPress={() => this.props.navigation.navigate('AddUserScreen')} 
                    style={styles.Button}>
                    <Image source={require('./../images/overdue.png')}
                     style={{flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined}} 
                    />
                    {/* <Text> ADD USER </Text> */}
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor = "#808080"
                    onPress={() => this.props.navigation.navigate('AddUserScreen')} 
                    style={styles.Button}>
                    <Image source={require('./../images/checkout.png')}
                     style={{flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined}} 
                    />
                    {/* <Text> ADD USER </Text> */}
                    </TouchableHighlight>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                     <TouchableHighlight underlayColor = "#808080"
                    onPress={() => this.props.navigation.navigate('AddUserScreen')} 
                    style={styles.Button}>
                    <Image source={require('./../images/editUser.png')}
                     style={{flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined}} 
                    />
                    {/* <Text> ADD USER </Text> */}
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor = "#808080"
                    onPress={() => this.props.navigation.navigate('AddUserScreen')} 
                    style={styles.Button}>
                    <Image source={require('./../images/inventory.png')}
                     style={{flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined}} 
                    />
                    {/* <Text> ADD USER </Text> */}
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor = "#808080"
                    onPress={() => this.props.navigation.navigate('AddUserScreen')} 
                    style={styles.Button}>
                    <Image source={require('./../images/return.png')}
                     style={{flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined}} 
                    />
                    {/* <Text> ADD USER </Text> */}
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Button: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#1c2f21',
    backgroundColor: '#e1e1e2'
  },
});
