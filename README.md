# GeoTogether-BackEnd-Demo

How to run the BackEnd-Demo:
Make sure you have android studio emulator running  
cd GeoTogether-BackEnd-Demo
npm run android


GeoTogether-BackEnd-Demo contains the following functionality:

Signup:

When the application starts it will ask the user to either enter his/her email and password and press login or press signUp to create a new account using firebase authentication, and add the user information to the database.

Login:

If the user has an account, the user will enter his/her email and password and press login, then the application will send the information to firebase authentication, and if the information match what firebase authentication have the user will be logged in and the application will retrieve the user information from the database including name and trips. 

Create new trip:

The application allows the user to create a new trip, and it will ask the user to enter the trip name, destinations, and members. After completing all the information for the trip, the user will press create and the trip will be added to the database. 

Show Google Map:

The application will show a Google map view when the user press on any trip he/she have.
Note: The Google Map view do not show the map for the trip yet.



Note: this demo is for the functionality of the application and not the user interface.
