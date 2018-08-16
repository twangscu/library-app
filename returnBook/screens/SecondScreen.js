// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import { BarCodeScanner } from 'expo';
// import BookInfo from '../src/components/BookInfo';

// // state = {
// //     responseData: ""
// // }

// _handleBarCodeRead = ({data}) => {
//     //console.log(data);
//     var isbn = data;
//     alert(`ISBN: ${isbn}`);
// }

// const SecondScreen = () => {
//     return(
//         <BarCodeScanner style = { styles.container } onBarCodeRead = { this._handleBarCodeRead } />
//     );
// }

// // class SecondScreen extends Component {
// //     render() {
// //         console.log(this.state);
// //         return(
// //             <BarCodeScanner style = { styles.container } onBarCodeRead = {this._handleBarCodeRead} />
// //         );
// //     }
// // }

// const styles = {
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }
//   };

//   export default SecondScreen;


import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo';

//const { width } = Dimensions.get('window');

class SecondScreen extends Component {

  constructor(props) {
    super(props);

    this.state= {
        //results: null
        results: []
    }
    this.fetchData = this.fetchData.bind(this);
  }


  // fetchData(URL) {
  //   return fetch(URL)
  //     .then((response) => response.json())
  //     .then((responseData) => { return responseData })
  //     //.catch((error) => { console.log(error)})
  // }


  fetchData(URL) {
    return fetch(URL)
      .then((response) => response.json())
      .then((responseData) => {
        return responseData 
      })
      .catch((error) => {
        console.error(error)
      })
  }


  _handleBarCodeRead = data => {
    let isbn = data.data;
    //let URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
    let URL = 'https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book'

    this.fetchData(URL).then(bookResult => {
      //console.log(bookResult)
      this.setState({ results: bookResult })
      //console.log(this.state.results.items[0].volumeInfo.title)
      //alert('The code has read the following info' + isbn + '\nTitle: ' + this.state.results.items[0].volumeInfo.title)
      
      //send isbn to backend here
      
      
      //this.props.navigation.navigate('ThirdPage', { title: this.state.results.items[0].volumeInfo.title });
      this.props.navigation.navigate('ThirdPage', { title: this.state.results[0].Title });
    })
  }

  render() {
    return (
      <BarCodeScanner
        onBarCodeRead={this._handleBarCodeRead}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    );
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});

export default SecondScreen;