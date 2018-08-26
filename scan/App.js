import React, {Component} from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Alert,
    ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import {Constants, BarCodeScanner, Permissions} from 'expo';



class Greeting extends Component {
    render() {
        return (
            <View style={styles.headerViewStyle}>
                <Text style={styles.headerTextStyle}>
                           Please Checkout Book
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
            'User Scan successful!'+data['data']
        );
        this.setState({allowScanReader: false, allowScanBook: false, hasReaderResult: true, ReaderData: data})
    };

    _handleBarCodeBook = data => {   // data是輸入
        Alert.alert(
            'Book Scan successful!'+data['data']
        );
        this.setState({allowScanReader: false, allowScanBook: false, hasBookResult: true, BookData: data})
    };
    _onPressReader = () => {  //()表示輸入為空
        this.setState({allowScanReader: true})
    };
    _onPressBook = () => {  //()表示輸入為空
        this.setState({allowScanBook: true})
    };
    _onPressConfirm = () => {  //() reques.PUT
        // console.log(this.state.BookData);
        // Alert.alert(
        //     this.state.BookData.data + this.state.ReaderData.data
        // );
        fetch('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/checkout', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'libraryName': 'lib1',
                // 'bookBarcode': this.state.BookData.data,
                // 'readerdata': this.state.ReaderData.data,
                'bookBarcode':'183752',
                'readerdata':'1212',
            }),
        }).then((response) => {
            if(response.status === 400){
                console.log(response);
                alert('Wrong information. Please scan again.');
            }
            else{console.log(response.status)}
        }
        )
    };
    render() {
        return (
            <ImageBackground source = {{uri: 'https://www.somervillepubliclibrary.org/sites/default/files/reading.png'}}
                             style={styles.backgroundStyle}>
            <View style = {styles.container}>

                <View style={{alignItems: 'center', height: 100}}>
                    <Greeting name='Xiao'/>
                </View>

                <View style={{alignItems: 'center', height: 100}}></View>

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
                        <View style={{alignItems: 'center', height: 50}}>
                            <Text style={{fontSize: 15}}>
                                Checkout Book:
                            </Text>
                            <Text style={{fontSize: 15}}>
                                code: {JSON.parse(this.state.BookData["data"])}
                            </Text>
                            <Text style={{fontSize: 15}}>
                                Title: {JSON.parse(this.state.BookData["data"])["Title"]}
                            </Text>
                        </View> :
                        <View style={{alignItems: 'center', height: 50}}></View>
                }

                {
                    this.state.allowScanReader == false && this.state.hasReaderResult === true ?
                        <View style={{alignItems: 'center', height: 50}}>
                            <Text style={{fontSize: 15}}>
                                Customer:
                            </Text>
                            <Text style={{fontSize: 15}}>
                                ISBN: {JSON.parse(this.state.ReaderData["data"])}
                            </Text>
                            <Text style={{fontSize: 15}}>
                                Title: {JSON.parse(this.state.ReaderData["data"])["Title"]}
                            </Text>
                        </View> :
                        <View style={{alignItems: 'center', height: 0}}></View>
                }


                <View style={{alignItems: 'center',flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>


                    <View style={{ height: 0}}>
                        <Button
                            onPress={this._onPressReader}
                            icon={
                                <Icon
                                    name='user'
                                    size={50}
                                    color='rgba(4, 87, 108, 1)'
                                />
                            }
                            title="SCAN USER"
                            titleStyle={styles.textStyle}
                            buttonStyle= {styles.buttonStyle}
                            containerStyle={{marginTop: 20}}
                        />
                    </View>


                    <View style={{ height: 0}}>
                        <Button
                            onPress={this._onPressBook}
                            icon={
                                <Icon
                                    name='book'
                                    size={50}
                                    color='rgba(4, 87, 108, 1)'
                                />
                            }
                            title="SCAN BOOK"
                            titleStyle={styles.textStyle}
                            buttonStyle= {styles.buttonStyle}
                            containerStyle={{marginTop: 20}}
                        />
                    </View>


                </View>


                <View style={{ height: 150}}>
                    <Button
                        onPress={this._onPressConfirm}
                        title="CONFIRM"
                        titleStyle={styles.textStyle}
                        buttonStyle= {styles.buttonStyle}
                        containerStyle={{marginTop: 20}}
                    />
                </View>

            </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    camera: {
        height: 200,
        width: 300,
    },
    buttonStyle: {
        borderRadius: 1,
        marginLeft: 3,
        marginRight: 3,
        //marginBottom: 100,
        height: 90,
        width: 190,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51, 63, 80)'
    },

    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
    },
    backgroundStyle: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(138,187,216,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextStyle: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '700'
    },

    headerViewStyle: {
        // backgroundColor: 'rgb(51, 63, 80)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection:'row',
        height: 80,
        paddingTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        elevation: 2,
        position: 'relative',
        flex: 1,
        maxWidth: 700

    }
});