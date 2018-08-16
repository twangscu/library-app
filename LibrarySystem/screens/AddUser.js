// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import React, { Component } from 'react';
import {
  
  View,
  StatusBar,
  TextInput,
  Text,
  Animated,
} from 'react-native';


class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}


export default class App extends React.Component {
  state = {
    value: '',
  };

  handleTextChangeFirstName = (newTextFirstName) => this.setState({ value: newTextFirstName });
  handleTextChangeMiddleName = (newTextMiddleName) => this.setState({ value: newTextMiddleName });
  handleTextChange = (newText) => this.setState({ value: newText });

  render() {
    return (
      <View style={{ flex: 1, padding: 30, backgroundColor: '#f5fcff' }}>
        <StatusBar hidden />
        <FloatingLabelInput
          label="First Name"
          value={this.state.value}
          onChangeText={this.handleTextChangeFirstName}
        />
        <FloatingLabelInput
          label="Middle Name"
          value={this.state.value}
          onChangeText={this.handleTextChangeMiddleName}
        />
        <FloatingLabelInput
          label="Last Name"
          value={this.state.value}
          onChangeText={this.handleTextChange}
        />
      </View>
    );
  }
  // render() {
    
  //   return (
  //     <View>
  //     <View>Soumya</View>
  //     {/* <FormLabel>Name</FormLabel>
  //     {/* <FormInput onChangeText={someFunction}/> */}
  //     {/* <FormValidationMessage>Error message</FormValidationMessage> */} */}
  //     </View>
  //   );
  // }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




// Habiba's code
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Button } from 'react-native';
// import { TextInput } from 'react-native';


// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { fn: 'First Name', ln: 'Last Name' , mn: 'Middle Name'};
//   }
  
  
//   render() {

//     return (
//       <View style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}>
//         <View style={{height: 60, backgroundColor: '#516380'}}>
//           <Text style={{fontSize: 40}}>Edit User</Text>
//         </View>
//         <View style={{margin: 15, backgroundColor: '#516380'}}>
//           <TextInput
//           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//           onChangeText={(fn) => this.setState({fn})}
//           value={this.state.fn}
//           />
//           <TextInput
//           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//           onChangeText={(mn) => this.setState({mn})}
//           value={this.state.mn}
//           />
//            <TextInput
//           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//           onChangeText={(ln) => this.setState({ln})}
//           value={this.state.ln}
//           />
//           <View style={{margin: 10}}>
//           <Button 
//               onPress={ this.FunctionUpdateBarcode.bind(this) }
//               title="Update Barcode"
//               color="cyan"
//               accessibilityLabel="Update Barcode button"
//               height="100"
//             />
//           </View>
//         </View>
//         <View style={{flexDirection:'row', height:100}}>
//           <View style={{width: 206}}>          
//             <Button 
//               onPress={ this.FunctionUpdate.bind(this) }
//               title="Update"
//               color="green"
//               accessibilityLabel="Update button"
//               height="200"
//             />
//           </View>
//           <View style={{width: 206}}>
//             <Button 
//               onPress={ this.FunctionCancel.bind(this) }
//               title="Cancel"
//               color="red"
//               accessibilityLabel="Cancel button"
//               height="200"
//             />
//           </View>
//         </View>
//        </View>
//     );
//   }
//   FunctionUpdate = () =>
//  {
//     alert("User Updated");
    
//  }
//  FunctionCancel = () =>
//  {
//    alert("Cancelled");
    
    
//  }
//  FunctionUpdateBarcode = () =>
//  {
//    alert("Barcode updated")
//  }
 
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box:{
//     flex: 1,
//     margin: 5, 

//   },
// });
