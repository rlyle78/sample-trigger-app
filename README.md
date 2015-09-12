M2X Sample Trigger Application
==============================

This small [node.js](http://nodejs.org/) application intends to show a simple way of performing an action when an [AT&T M2X](https://m2x.att.com) Data Source Trigger is fired, in this case sending an email through the [SendGrid](http://sendgrid.com/) API. In order to make setup easier we're assuming you will use [Heroku](http://heroku.com/) to deploy the application, although you can using any compatible application hosting service.


## Setup Application

### Via Heroku Deploy Button (Recommended)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

1. Deploy the application using the Heroku Deploy button above (Heroku account required)
2. [Clone](https://devcenter.heroku.com/articles/git-clone-heroku-app) the newly created Heroku application
`heroku git:clone -a myapp`
3. Set constants for the notification emails (`EMAIL_FROM` and `EMAIL_RCPT`) in [`main.js`](https://github.com/attm2x/sample-trigger-app/blob/master/main.js)
4. You can check the status by going into the `/status` path, of your published application URL, which can be found in your Heroku settings under Domains

### Manual Setup
1. Clone this repo and set constants for the notification emails (`EMAIL_FROM` and `EMAIL_RCPT`) in [`main.js`](https://github.com/attm2x/sample-trigger-app/blob/master/main.js)
2. Signup/Login to Heroku, [create a new application](https://devcenter.heroku.com/articles/quickstart) and push code to Heroku
3. Add the SendGrid Add-on to the newly created Heroku application
4. You can check the status by going into the `/status` path, of your published application URL, which can be found in your Heroku settings under Domains

## Setup Device, Stream(s) and Trigger

1. Signup for an [AT&T M2X Account](https://m2x.att.com/signup).
2. Create your first [Device](https://m2x.att.com/devices)
3. Add Stream(s) to your Device
4. Add a Trigger to your Device and point the callback URL to the domain where your application will be hosted (Heroku will provide you with this URL). By default, the URL path will be `/email-trigger`, so an example URL would be: http://your-domain.com/email-trigger
5. Start pushing values to your Device Stream(s).

Please consult the [AT&T M2X glossary](https://m2x.att.com/developer/documentation/v2/glossary) if you have questions about any M2X specific terms.


## Usage

Once everything is setup and values are being pushed to your Stream(s), every time a value(s) meets the Trigger condition the API will send a `POST`request to your application at the URL provided. The application will then process the request and send an email to/from the addresses specified in the code in the `EMAIL_FROM` and `EMAIL_RCPT` variables.


## License

This application is delivered under the MIT license. See [LICENSE](LICENSE) for the specific terms.
