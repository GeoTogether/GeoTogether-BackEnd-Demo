
import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

//importing the the classes
import Login from './Login';
import SignUp from './SignUp';
import Trips from './Trips';
import NewTrip from './NewTrip';
import GMapView from './GMapView';

// adding all the classes ti navigator 
const Home = StackNavigator({
   Login: { screen: Login },
   SignUp:{screen: SignUp},
   Trips:{screen: Trips},
   NewTrip:{screen: NewTrip},
   GMapView:{screen: GMapView}
});

export default Home;
