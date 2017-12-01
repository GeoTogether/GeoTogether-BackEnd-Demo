import React from 'react';
  import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
  import firebase from './firebaseStorage';

  import {
    StackNavigator
} from 'react-navigation';
  import { Input } from './components/input';
  import { Button } from './components/Button';

 
  
  export default class Login extends React.Component {

    constructor(props){
        super(props)


       
    }

    
    
   
    
// navigation options to be used to navigate the class from other classes

    static navigationOptions ={
        title:'Login', 
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
     }


    componentWillMount() {
 
      
      }
    

      // function to sign in the user using firebase authentication
      onPressSignIn() {
        this.setState({
          authenticating: true,
        });
    
        const { email, password } = this.state; // gets the user email and password


        // call firebase authentication and checks the email and password
       firebase.auth().signInWithEmailAndPassword(email, password).then(user => this.setState({ // if the user email and password did  match what firebase 
            authenticating: false,
            user,
            error: '',
          })).catch(() => this.setState({ // if the user email and password did not match what firebase have set failure
                authenticating: false,
                user: null,
                error: 'Authentication Failure',
              }))

             

              var encod = email.replace(".", ",");

              // gets the user name from firebase database 
              firebase.database().ref('users/').child(encod).child('username').on('value', (snapshot) => {
               
                this.setState({ datastor: snapshot.val()})

               } )

                    

  }



    

  // funcation to sign out using firebase authentication.
  
      onPressLogOut() {
        firebase.auth().signOut()
          .then(() => {
            this.setState({
              email: '',
              password: '',
              authenticating: false,
              user: null,
            })
          }, error => {
            console.error('Sign Out Error', error);
          });
      }
  



     
     
    
      renderCurrentState() {
 const { navigate } = this.props.navigation;

        if (this.state.authenticating) {
          return (
            <View style={styles.form}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
    
        if (this.state.user !== null) {
          return (
            navigate('Trips') // after login go to trips
          )
        }
    
        return (
          <View style={styles.form}>
            <Input
              placeholder='Enter your email...'
              label='Email'
              onChangeText={email => this.setState({ email })} // getting the user email
              value={this.state.email}
            />
            <Input
              placeholder='Enter your password...'
              label='Password'
              secureTextEntry
              onChangeText={password => this.setState({ password })} // getting the user password
              value={this.state.password}
            />
            <Button onPress={() => this.onPressSignIn()}>Log In</Button>
  
            <Button onPress={() => navigate('SignUp')}>Sign Up</Button>
            <Text>{this.state.error}</Text>
          </View>
        )
    
      }
    
      render() {
        return (
          <View style={styles.container}>
            {this.renderCurrentState()}
          </View>
        );
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



