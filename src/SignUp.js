import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import { Input } from './components/input';
import { Button } from './components/Button';
import Login from './Login';
import firebase from './firebaseStorage';






export default class SignUp extends React.Component {

    constructor(props) {
        super(props)
    }

  // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'SignUp',
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
    }

    componentWillMount() {
      

    }

// function to sign up the user using firebase authentication
    onPressSignUp(){
        const { email, password, name } = this.state;
        const { navigate } = this.props.navigation;

        // add the user email and password to firebase 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => this.setState({
              authenticating: false,
              user,
              error: '',
            })).catch(() => this.setState({
              authenticating: false,
              user: null,
              error: 'Sign Up Failure',
            }))
  
            var encod = email.replace(".", ","); 
            // add the user to the database
            firebase.database().ref('users/').child(encod).set({
              username: name,
              email: email,
              pass : password
            });

             
         // if the register is success 
            if (this.state.error == ''){
                navigate('Login'); // go back to login
            }


    }





    render() {
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.form}>

                <Input
                    placeholder='Enter your name...'
                    label='Name'
                    onChangeText={name => this.setState({ name })} // gets the user name
                    value={this.state.name}
                />

                <Input
                    placeholder='Enter your email...'
                    label='Email'
                    onChangeText={email => this.setState({ email })} // gets the user email
                    value={this.state.email}
                />
                <Input
                    placeholder='Enter your password...'
                    label='Password'
                    secureTextEntry
                    onChangeText={password => this.setState({ password })} // gets the user password
                    value={this.state.password}
                />
                <Button onPress={()=> navigate('Login')}>Log In</Button> 

                <Button onPress={() => this.onPressSignUp()}>Sign Up</Button>
                <Text>{this.state.error}</Text>
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
