var util = require("util");
var express = require("express");


// Define constants used to form and send each notification email
var SENDGRID_USERNAME = "<your sendgrid username>";
var SENDGRID_PASSWORD = "<your sendgrid password>";
var EMAIL_FROM = "<sender address for the email>";
var EMAIL_RCPT = "<recipient address for the email>";
var EMAIL_BODY =
    "Temperature measured by the birdi device has reached the limit.\n" +
    "Current temperature is %s ºC";


// Initialize express app that will handle trigger requests from the API
var app = express();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(app.router);
});


// Initialize SendGrid object for sending notification emails
var sendgrid = require("sendgrid")(
    SENDGRID_USERNAME,
    SENDGRID_PASSWORD
);


// Define http endpoint that will receive trigger requests from M2X API
app.post("/trigger", function(req, res) {
    sendgrid.send({
        from: EMAIL_FROM,
        to: EMAIL_RCPT,
        subject: "Temperature reached limit",
        text: util.format(EMAIL_BODY, req.body.value)
    });

    res.send("OK");
});

// Remember that if you're not using the HTTP port your trigger URL
// will have to include it as well. Example: "http://your.domain:5000/trigger"
app.listen(5000);
