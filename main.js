// # ######################################## #
// # Sample AT&T M2X Trigger Notification App #
// # ######################################## #

var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');

// Initialize express application that will handle trigger requests from the M2X API
var app = express();

// Heroku sets the PORT environment variable with the port it expects the application
// to listen for connections. If you are going to run this application outside
// Heroku, you can set the variable, or change this to whatever fits your needs.
app.set("port", process.env.PORT || 5000);

// bodyParser makes sure the JSON request data from the API comes as an object
app.use(bodyParser.json());

// Define HTTP endpoint that will receive trigger requests from AT&T M2X API
app.post("/m2x-trigger", function(req, res) {

    console.log("M2X POST request received");

    // Parse Custom Data sent with M2X Trigger Notification payload
    var customData = JSON.parse(req.body.custom_data);

    // Extract the delivery method from the Custom Metadata
    var deliveryMethod = customData.delivery_method;

    // Extract the recipient from the Custom Data
    var recipient = customData.recipient;

    // Craft the message to be delivered via SMS or Email.
    //
    // In order to include more information in the message we pass the
    // current value for each stream that triggered this event.
    //
    // If the trigger is configured to notify on reset, a reset notification 
    // message will be delivered when the trigger has been reset.
    //
    // To see which data comes with the request, please check the
    // AT&T M2X API documentation:
    // http://m2x.att.com/developer/documentation/v2/triggers#Test-Trigger
    if(req.body.event == "fired") {
        var message = "Conditions met for M2X Trigger named \'" + req.body.trigger + "\'. VALUES: { "; 
    } else {
        var message = "M2X Trigger named \'" + req.body.trigger + "\' has been reset. VALUES: { ";  
    }
    var values = req.body.values;
    var valuesLength = Object.keys(values).length;
    var iterations = 1;
    for(var stream in values) {
        message = message + stream + ": " + values[stream].value;
        
        if(iterations == valuesLength) {
            message = message + " }";
            break;
        } else {
            message = message + ", ";
            iterations++;
        }
    }

    console.log("Preparing to send message: " + message);
    console.log("to: " + recipient);

    if(deliveryMethod == "sms") {
        request.post({
          headers: {
            'content-type' : 'application/x-www-form-urlencoded',
            'Accepts': 'application/json'
          },
          url:     process.env.BLOWERIO_URL + 'messages',
          form:    {
            to: recipient,
            message: message
          }
        }, function(error, response, body){
          if (!error && response.statusCode == 201)  {
            console.log('Message sent!');
          } else {
            var apiResult = JSON.parse(body);
            console.log('Error was: ' + apiResult.message);
          }
        })

    } else if(deliveryMethod == "email") {
        // Extract the sender from the Custom Data.
        //
        // Sender is only applicable to email delivery,
        // while testing you can use the same email address
        // for sender & recipient
        var sender = customData.sender;

        // Define a subject for the email
        var emailSubject = "Trigger notification";
        
        // Initialize SendGrid object
        var sendgrid = require("sendgrid")(
            process.env.SENDGRID_USERNAME,
            process.env.SENDGRID_PASSWORD
        );

        sendgrid.send({
            from: sender,
            to: recipient,
            subject: emailSubject,
            text: message
        });
    }

    res.send("OK");
});

app.get("/status", function(req, res) {
    res.send("Application is running!");
});


app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost:" + app.get("port"));
});
