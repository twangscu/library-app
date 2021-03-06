import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Button from '../src/components/Button';
import Header from '../src/components/Header';

class FirstScreen extends Component {
    render () {
        return(
            <ImageBackground source = {{uri: 'https://www.somervillepubliclibrary.org/sites/default/files/reading.png'}}
                style={styles.backgroundStyle}>
                <View style = {styles.container}>
                    <View style = { styles.headerView }>
                        <Header headerText = { "RETURN" }/>
                    </View>
                    <View style = { styles.buttonView }>
                        <Button onPress = { () => this.props.navigation.navigate('SecondPage') }>
                            Scan Book
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: 'rgba(138,187,216,0.5)',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    headerView: {
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        
    },

    buttonView: {
        justifyContent: 'center',
        marginBottom: 100
    },

    backgroundStyle: {
        width: '100%',
        height: '100%'
    },
  };

  export default FirstScreen;