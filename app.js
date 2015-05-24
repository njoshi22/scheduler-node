var express = require('express');
var Firebase = require('firebase');
var twilio = require('twilio'),
client = twilio('AC78f17d46e4c8026691c6911fc7ff4f6a','7d65ecfa2421f3d31f75be40548cfebe');

var app = express();

var fb = new Firebase('https://eatery.firebaseio.com/'),
usersRef = fb.child('users');

app.get('/', function(req,res) {
  res.send('Hello!');
});

app.get('/users', function(req,res) { //do stuff when users load the '/' route
  fb.authWithPassword({
    email: "njoshi22@gmail.com",
    password: "ajinkya1"
  }, function(err,authData) {
    if(err) {
      console.log("Login failed.", err);
    } else {
      console.log("Login successful.");

      //send firebase data when get request received
      usersRef.once('value', function(mainSnap) {
        var arr =  [];
        mainSnap.forEach(function(child) {
          arr.push({
            name: child.val().name,
            dob: child.val().dob
          });
        });
        res.send(JSON.stringify(arr));
      });
  }
  });
});

var port = process.env.port || 1337;

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at %s:%s', host, port);
});

// Firebase stuff here - can be exported to a different module perhaps

// fb.authWithPassword({
//   email: "njoshi22@gmail.com",
//   password: "ajinkya1"
// }, function(err,authData) {
//   if(err) {
//     console.log("Login failed.", err);
//   } else {
//     console.log("Login successful.");
//
//     usersRef.on('child_added', function(snap) {
//       var content = 'New child added: ' + snap.val().name;
//       console.log(snap.val());
//       //res.send(snap.val());
//
//       //Twilio SMS code - IT WORKS!
//       // client.sendMessage({
//       //   to: '+919980315315',
//       //   from: '+12055066670',
//       //   body: content
//       // }, function(err,data) {
//       //   if(err) {
//       //     console.log("Message sending failed", err);
//       //   } else {
//       //     console.log(data.body);
//       //   }
//       // }); //end twilio
//     });
//   }
// });
