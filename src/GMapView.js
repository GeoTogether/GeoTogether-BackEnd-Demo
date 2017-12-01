import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import { Input } from './components/input';
import { Button } from './components/Button';
import Login from './Login';
import firebase from './firebaseStorage';
import MapView from 'react-native-maps';







export default class GMapView extends React.Component {

    constructor(props) {
        super(props)
    }

 // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'GMapView',
        headerStyle: {
            backgroundColor: '#212121',

        },
        headerTitleStyle: {
            color: '#fff'
        }
    }
 // the user state with all of the user and the trip information 
    state = {
        destination1: '',
        destination2: '',
        authenticating: false,
        user: null,
        error: '',
        datastor: '',
        tripname: '',
        members: '',
    }

    componentWillMount() {


    }







    render() {
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.form}>

           <MapView style ={styles.map} region={{

               latitude: 33.424564,
               longitude:-111.928001,
               latitudeDelta:0.1,
               longitudeDelta:0.1
           }}>
           <MapView.Marker coordinate ={{
             latitude: 33.424564,
             longitude:-111.928001
         }} title ={'marker'}
         description ={'description'} />
           
           </MapView>

            </View>
        )

    }











}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    form: {
        flex: 1
    },
    map:{
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0
    }
});

