import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import { Input } from './components/input';
import { Button } from './components/Button';
import Login from './Login';
import firebase from './firebaseStorage';





export default class Trips extends React.Component {

   

    constructor(props) {
        super(props)
    }

 // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Trips',
        headerStyle: {
            backgroundColor: '#212121',

        },
        headerTitleStyle: {
            color: '#fff'
        }
    }
 // the user state with all of the user information 
      state = {
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
        datastor: '',
        name: '',
        trips: [],
    }

    
  
    

    
    componentWillMount() {


        // gets the current user email
        var email = firebase.auth().currentUser.email;


        var encod = email.replace(".", ",");

        // get the user name from the database 
        firebase.database().ref('users/').child(encod).child('username').on('value', (snapshot) => {
           
            this.setState({ datastor: snapshot.val() })

        });

        // gets all the user trips 
        this.onPressGetTrips();
       


    }


 
   
// function to get all the user trips using firebase database
    onPressGetTrips() {

        // gets the current user email
        var email = firebase.auth().currentUser.email;

        var encod = email.replace(".", ",");

     // get all the user trips from the firebase database
     firebase.database().ref('trips/').child(encod).on('value', (snapshot) => {
        snapshot.forEach((tripSnapshot) => {
       

            const val = tripSnapshot.val();


            if(this.state.trips.indexOf(val.tripName)==-1){

                this.setState({ trips: this.state.trips.concat(val.tripName) })

            }
   
            



        })
      })


      

    }


    render() {
        const { navigate } = this.props.navigation;

        this.onPressGetTrips();

      // adding buttom components for all the user trips 
      var ButtonComponents =this.state.trips.map((type)=> <Button onPress={() => navigate('GMapView')}> {type} </Button>)
      


        return (

            <View style={styles.form}>

                <Text>Hello {this.state.datastor}</Text>

                <Button onPress={() => navigate('NewTrip')}>New Trip</Button>
               
               {ButtonComponents}




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
