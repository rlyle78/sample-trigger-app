sample-trigger-app
==================

This small node.js application intends to show a simple way of performing an action when
an AT&T M2X Data Source Trigger is fired, in this case sending an email through the SendGrid API.
In order to make setup easier we're assuming you will use Heroku to deploy the application,
although it's not really a requirement.


## Setup Application

1. Signup/Login to Heroku and create a new app.
2. Add the Sendgrid Add-on
3. [Set the following env variables on heroku] using your SendGrid credentials: SENDGRID_USERNAME, SENDGRID_PASSWORD
4. Edit the main.js file and set constants for the notification emails. Push those changes to Heroku.
5. Make sure you've pushed the Procfile as this is needed by Heroku.
6. In your application root directory run `heroku ps:scale web=1` to start one dyno of your app.


## Setup Data Source, Stream and Trigger

1. Signup for an [AT&T M2X Account](https://m2x.att.com/signup).
2. Create your first [Data Source Blueprint](https://m2x.att.com/blueprints)
3. Add a Stream to your Data Source Blueprint
4. Add a Trigger to your Data Source Stream and point the callback URL to the domain where your application will be hosted (Heroku will provide you with this URL). The URL path (unless you changed it) will be /email-trigger, so an example URL would be: http://your-domain.com/email-trigger
5. Start pushing values to your Data Source Stream.

Please consult the [AT&T M2X glossary](https://m2x.att.com/developer/documentation/glossary) if you have questions about any M2X specific terms.


## Usage

Once everything is setup and values are being pushed to your Stream, every time a value
meets the Trigger's condition the API will send a request to your application at the
URL provided. The app will then process the request and send an email to the address
you specified in the code (environment variables could be used for this too).


## License

This application is delivered under the MIT license. See [LICENSE](LICENSE) for the terms.

