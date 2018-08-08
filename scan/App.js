import React, {Component} from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import {Constants, BarCodeScanner, Permissions} from 'expo';



class Greeting extends Component {
    render() {
        return (
            <View>
                <Text style={{fontSize: 30}}>
                    Welcome to {this.props.name}'
                </Text>
                <Text style={{fontSize: 30}}>
                    Book Barcode Reader
                </Text>
            </View>

        );
    }
}

class FunctionIntroduction extends Component {
    render() {
        return (
            <Text style={{fontSize: 20}}>Press the button to scan a barcode</Text>
        );
    }
}

class ResultIntroduction extends Component {
    render() {
        return (
            <Text style={{fontSize: 25}}>The code read has the following info:</Text>
        );
    }
}

class SubmitResult extends Component {
    render() {
        return (
            <Text style={{fontSize: 25}}>Confirm</Text>
        );
    }
}

export default class BarCodeReader extends Component {
    state = {
        hasCameraPermission: null,
        allowScanReader: false,
        allowScanBook: false,
        hasReaderResult: false,
        hasBookResult: false,
        hasResult: false,
        BookData: null,
        ReaderData: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeReader = data => {   // data是輸入
        Alert.alert(
            'Reader Scan successful!'+data['data']
        );
        this.setState({allowScanReader: false, allowScanBook: false, hasReaderResult: true, ReaderData: data})
    };

    _handleBarCodeBook = data => {   // data是輸入
        Alert.alert(
            'Book Scan successful!'
        );
        this.setState({allowScanReader: false, allowScanBook: false, hasBookResult: true, BookData: data})
    };
    _onPressReader = () => {  //()表示輸入為空
        this.setState({allowScanReader: true})
    };
    _onPressBook = () => {  //()表示輸入為空
        this.setState({allowScanBook: true})
    };
    _onPressConfirm = () => {  //() reques.POST
        Alert.alert(
            'SAVE TO DB'
        );
        this.setState({})
    };
    render() {
        return (
            <View>
                {/*<View style={{alignItems: 'center', height: 100}}></View>*/}


                {/*<View style={{alignItems: 'center', height: 150}}>*/}
                    {/*<Greeting name='Xiaoxiao'/>*/}
                {/*</View>*/}




                <View style={{alignItems: 'center', height: 100}}>
                    {
                        this.state.hasCameraPermission === null ?
                            <Text>Requesting for camera permission</Text> :
                            this.state.hasCameraPermission === false ?
                                <Text>Camera permission is not granted</Text> :
                                this.state.allowScanReader == true ?
                                    <BarCodeScanner onBarCodeRead={this._handleBarCodeReader} style={{
                                        height: 100,
                                        width: 200,

                                    }}/> :
                                    this.state.allowScanBook == true ?
                                        <BarCodeScanner onBarCodeRead={this._handleBarCodeBook} style={{
                                            height: 100,
                                            width: 200,

                                        }}/> :
                                    <View style={{alignItems: 'center', height: 100}}></View>
                    }
                </View>


                {
                    this.state.allowScanBook == false && this.state.hasBookResult === true ?
                        <View style={{alignItems: 'center', height: 100}}>
                            <Text style={{fontSize: 15}}>
                                Checkout Book:
                            </Text>
                            <Text style={{fontSize: 15}}>
                                ISBN: {JSON.parse(this.state.BookData["data"])["ISBN"]}
                            </Text>
                            <Text style={{fontSize: 15}}>
                                Title: {JSON.parse(this.state.BookData["data"])["Title"]}
                            </Text>
                        </View> :
                        <View style={{alignItems: 'center', height: 100}}></View>
                }

                {
                    this.state.allowScanReader == false && this.state.hasReaderResult === true ?
                        <View style={{alignItems: 'center', height: 100}}>
                            <Text style={{fontSize: 15}}>
                                Customer:
                            </Text>
                            <Text style={{fontSize: 15}}>
                                ISBN: {JSON.parse(this.state.ReaderData["data"])["ISBN"]}
                            </Text>
                            <Text style={{fontSize: 15}}>
                                Title: {JSON.parse(this.state.ReaderData["data"])["Title"]}
                            </Text>
                        </View> :
                        <View style={{alignItems: 'center', height: 100}}></View>
                }


                <View style={{alignItems: 'center',flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>


                    <View style={{ height: 50}}>
                        <Button
                            onPress={this._onPressReader}
                            icon={
                                <Icon
                                    name='user'
                                    size={50}
                                    color='rgba(4, 87, 108, 1)'
                                />
                            }
                            title="SACN READER"
                            titleStyle={{ fontWeight: "700", color:'rgba(4, 87, 108, 1)',alignItems: 'center' }}
                            buttonStyle={{
                                backgroundColor: "rgba(255, 255, 2, 0.77)",
                                width: 150,
                                height: 150,
                            }}
                            containerStyle={{marginTop: 20}}
                        />
                    </View>




                    <View style={{ height: 50}}>
                        <Button
                            onPress={this._onPressBook}
                            icon={
                                <Icon
                                    name='book'
                                    size={50}
                                    color='rgba(4, 87, 108, 1)'
                                />
                            }
                            title="SACN BOOK"
                            titleStyle={{ fontWeight: "700", color:'rgba(4, 87, 108, 1)',alignItems: 'center' }}
                            buttonStyle={{
                                backgroundColor: "rgba(255, 255, 2, 0.77)",
                                width: 150,
                                height: 150,
                            }}
                            containerStyle={{marginTop: 20}}
                        />
                    </View>


                </View>


                


                <View style={{ height: 50}}>
                    <Button
                        onPress={this._onPressConfirm}
                        title="CONFIRM"
                        titleStyle={{ fontWeight: "700", color:'rgba(4, 87, 108, 1)',alignItems: 'center' }}
                        buttonStyle={{
                            backgroundColor: "rgba(255, 255, 2, 0.77)",
                            width: 150,
                            height: 50,
                        }}
                        containerStyle={{marginTop: 20}}
                    />
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    camera: {
        height: 200,
        width: 300,
    }
});