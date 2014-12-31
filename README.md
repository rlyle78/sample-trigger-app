M2X Sample Trigger Application
==============================

This small [node.js](http://nodejs.org/) application intends to show a simple way of performing an action when an [AT&T M2X](https://m2x.att.com) Data Source Trigger is fired, in this case sending an email through the [SendGrid](http://sendgrid.com/) API. In order to make setup easier we're assuming you will use [Heroku](http://heroku.com/) to deploy the application, although you can using any compatible application hosting service.


## Setup Application

1. Signup/Login to Heroku and [create a new application](https://devcenter.heroku.com/articles/quickstart)
2. Add the SendGrid Add-on
3. [Set the following env variables on heroku](https://devcenter.heroku.com/articles/config-vars) using your SendGrid credentials: SENDGRID_USERNAME, SENDGRID_PASSWORD
4. Edit the main.js file and set constants for the notification emails. Push those changes to Heroku.
5. In your application root directory run `heroku ps:scale web=1` to start one dyno of your application.
6. You can check the status by going into the `/status` path, of your published application URL.


## Setup Device, Stream and Trigger

1. Signup for an [AT&T M2X Account](https://m2x.att.com/signup).
2. Create your first [Device](https://m2x.att.com/devices)
3. Add a Stream to your Device
4. Add a Trigger to your Device Stream and point the callback URL to the domain where your application will be hosted (Heroku will provide you with this URL). By default, the URL path will be `/email-trigger`, so an example URL would be: http://your-domain.com/email-trigger
5. Start pushing values to your Device Stream.

Please consult the [AT&T M2X glossary](https://m2x.att.com/developer/documentation/v2/glossary) if you have questions about any M2X specific terms.


## Usage

Once everything is setup and values are being pushed to your Stream, every time a value meets the Trigger's condition the API will send a request to your application at the URL provided. The application will then process the request and send an email to the address specified in the code (environment variables could be used for storing these values instead of being hardcoded in the source).


## License

This application is delivered under the MIT license. See [LICENSE](LICENSE) for the specific terms.

