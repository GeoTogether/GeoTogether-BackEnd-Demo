import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import { Input } from './components/input';
import { Button } from './components/Button';
import Login from './Login';
import firebase from './firebaseStorage';






export default class NewTrip extends React.Component {

    constructor(props) {
        super(props)
    }


 // navigation options to be used to navigate the class from other classes
    static navigationOptions = {
        title: 'NewTrip',
        headerStyle: {
            backgroundColor: '#212121',

        },
        headerTitleStyle: {
            color: '#fff'
        }
    }
 // the user state with all of the user information 
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



// function to create a new trip using firebase database
    onPressNewTrip() {
        const { navigate } = this.props.navigation;
        const { tripname, destination1, destination2, members } = this.state;



        // gets the current user email
        var email = firebase.auth().currentUser.email;

        var encod = email.replace(".", ",");

        // add the the trip to the database
        firebase.database().ref('trips/').child(encod).push({
            tripName: tripname,
            admin: email,
            destination1: destination1,
            destination2: destination2,
            members: members
        });



        //after adding the trip go back to trips
        navigate('Trips');


    }




    render() {
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.form}>

                <Input
                    placeholder='Enter Trip name...'
                    label='Trip Name'
                    onChangeText={tripname => this.setState({ tripname })} // gets the trip name
                    value={this.state.tripname}
                />

                <Input
                    placeholder='Enter your first destination...'
                    label='First Destination'
                    onChangeText={destination1 => this.setState({ destination1 })} // gets the first destination
                    value={this.state.destination1}
                />
                <Input
                    placeholder='Enter your second destination...'
                    label='Second Destination'
                    onChangeText={destination2 => this.setState({ destination2 })} // gets the second destination
                    value={this.state.destination2}
                />


                <Input
                    placeholder='Enter your trip members separate by comma...'
                    label='Trip members'
                    onChangeText={members => this.setState({ members })} //gets the trip members
                    value={this.state.members}
                />



                <Button onPress={() => this.onPressNewTrip()}>Create </Button>

                <Button onPress={() => navigate('Trips')}>Cancel</Button>

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
    }
});
