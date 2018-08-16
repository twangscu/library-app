import React, {Component} from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Button from '../src/components/Button';

class ThirdScreen extends Component {
    render() {
        return(
            <ImageBackground source = { {uri: 'https://www.somervillepubliclibrary.org/sites/default/files/reading.png'}}
            style = { styles.backgroundStyle } >
                <View style = {styles.container}>
                    <View style = { styles.textContainer }>
                        <Text>Successful Return!</Text>
                        <Text>{ this.props.navigation.state.params.title }</Text>
                    </View>
                    
                    <View style = { styles.buttonContainer }>
                        <Button onPress = { () => this.props.navigation.navigate('FirstPage') }>
                            Return Another Book
                        </Button>
                        <Button>
                            Return to Home
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
      justifyContent: 'space-between',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: '#008000'
        marginBottom: 7
    },

    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    backgroundStyle: {
        height: '100%',
        width: '100%'
    }
  };

  export default ThirdScreen;