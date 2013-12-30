// # ########################### #
// # Sample AT&T M2X trigger app #
// # ########################### #

var util = require("util");
var express = require("express");


// Define from/to constants used to form and send each notification email
var EMAIL_FROM = "no-reply@your-domain.com";
var EMAIL_RCPT = "you@your-domain.com";


// Define a subject for the email
//
// Example:
//
// var EMAIL_SUBJECT = "Temperature reached limit";
var EMAIL_SUBJECT = "Trigger notification";

// Define a content for the email
//
// Example:
//
// var EMAIL_BODY =
//     "Temperature measured by the birdi device has reached the limit.\n" +
//     "Current temperature is %s ºC";
//
// In this example we use data from the trigger event that comes in each request
// the API sends to us. Check out below where we form the body to see what other data
// is available.
var EMAIL_BODY = "Current value: %s";


// Initialize express app that will handle trigger requests from the API
var app = express();

app.configure(function() {
    // bodyParser makes sure the JSON request data from the API comes as an object
    app.use(express.bodyParser());
    app.use(app.router);
});


// Initialize SendGrid object
var sendgrid = require("sendgrid")(
    process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD
);


// Define HTTP endpoint that will receive trigger requests from AT&T M2X API
app.post("/email-trigger", function(req, res) {

    // In order to include more information in our email we pass the
    // current value for the stream that triggered this event.
    // Other data coming in this request, as shown in the
    // AT&T M2X API documentation (http://m2x.att.com/developer/documentation/feed#Test-Trigger) is:
    //
    // * feed_id Feed's unique identifier.
    // * stream Stream's name.
    // * trigger_name The trigger's name.
    // * trigger_description The condition that caused the trigger to be fired.
    // * condition The operator for the trigger's condition.
    // * threshold The threshold value that's evaluated for this trigger.
    // * value The stream value that caused this trigger to be fired.
    // * at The timestamp at which this value was received.
    //
    var body = util.format(EMAIL_BODY, req.body.value);

    sendgrid.send({
        from: EMAIL_FROM,
        to: EMAIL_RCPT,
        subject: EMAIL_SUBJECT,
        text: body
    });

    res.send("OK");
});

// 5000 is the internal port Heroku uses to access our app instance.
// If you're using this outside Heroku on your own server you can change this
// to whatever fits your needs.
app.listen(5000);
