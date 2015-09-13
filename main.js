// # ########################### #
// # Sample AT&T M2X trigger app #
// # ########################### #

var express = require("express");
var bodyParser = require("body-parser");


// Define from/to constants used to form and send each notification email
var EMAIL_FROM = "no-reply@your-domain.com";
var EMAIL_RCPT = "you@your-domain.com";


// Define a subject for the email
//
// Example:
//
// var EMAIL_SUBJECT = "Temperature reached limit";
var EMAIL_SUBJECT = "Trigger notification";

// Initialize express application that will handle trigger requests from the API
var app = express();

// Heroku sets the PORT environment variable with the port it expects the application
// to listen for connections. If you are going to run this application outside
// Heroku, you can set the variable, or change this to whatever fits your needs.
app.set("port", process.env.PORT || 5000);

// bodyParser makes sure the JSON request data from the API comes as an object
app.use(bodyParser.json());


// Initialize SendGrid object
var sendgrid = require("sendgrid")(
    process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD
);


// Define HTTP endpoint that will receive trigger requests from AT&T M2X API
app.post("/email-trigger", function(req, res) {

    // In order to include more information in our email we pass the
    // current value for each stream that triggered this event.
    //
    // To see which data comes with the request, please check the
    // AT&T M2X API documentation:
    // https://m2x.att.com/developer/documentation/v2/triggers#Test-Trigger
    var body = "";
    for(var stream in req.body.values) {
        body = body + stream + ": " + req.body.values[stream].value + ", ";
    }

    sendgrid.send({
        from: EMAIL_FROM,
        to: EMAIL_RCPT,
        subject: EMAIL_SUBJECT,
        text: body
    });

    res.send("OK");
});

app.get("/status", function(req, res) {
    res.send("Application is running!");
});


app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost:" + app.get("port"));
});
